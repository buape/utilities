import { EventEmitter } from "node:events"
import {
	APIEmbed,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ChatInputCommandInteraction,
	ComponentType,
	InteractionReplyOptions,
	InteractionResponse,
	Message,
	MessageActionRowComponentBuilder
} from "discord.js"
import { BetterClient } from "../index.js"

type PaginatorSettings = {
	/** A unique ID for this paginator, typically the ID of the interaction. Max 75 characters */
	id: string
	/** The user ID of the user who triggered this paginator */
	userId: string
	/** The client */
	client: BetterClient
	/** The amount of time in milliseconds to wait before the paginator times out. */
	timeout?: number
}

export type PaginatorMessage = {
	embeds?: APIEmbed[]
	components?: ActionRowBuilder<MessageActionRowComponentBuilder>[]
	ephemeral?: boolean
	content?: string
	files?: InteractionReplyOptions["files"]
}

/**
 * A paginator for Discord messages.
 * @extends EventEmitter
 * @example
 * const pages: PaginatorMessage[] = [
 * 	{
 * 		embeds: [
 * 			// embed
 * 		],
 * 		components: [
 * 			// components
 * 		],
 * 		ephemeral: true
 * 	}]
 * const paginator = new Paginator({
 * 	id: interaction.id,
 * 	userId: interaction.user.id,
 * 	client: client
 * }, pages)
 * paginator.send(interaction)
 *
 */
export class Paginator extends EventEmitter {
	public id: string
	public settings: PaginatorSettings
	public pages: PaginatorMessage[]

	constructor(settings: PaginatorSettings, pages?: PaginatorMessage[]) {
		super()
		this.settings = {
			id: settings.id,
			userId: settings.userId,
			client: settings.client,
			timeout: settings.timeout ?? 30000
		}
		if (this.settings.id.length > 75)
			throw new Error("Paginator ID must be less than 75 characters.")
		this.id = this.settings.id
		this.pages = pages ?? []
	}

	public addPages(page: PaginatorMessage[]) {
		this.pages.push(...page)
	}

	public async send(
		interaction: ChatInputCommandInteraction | ButtonInteraction,
		page = 1,
		edit: Message<boolean> | undefined = undefined
	) {
		if (!interaction.channel) {
			return Promise.reject(new Error("No channel to send paginator to."))
		}
		const discordMsg = this.getDiscordMessage(page)

		if (edit) {
			await edit.edit(discordMsg)
			return this.awaitIt(edit)
		}

		if (interaction.deferred) {
			await this.awaitIt(await interaction.editReply(discordMsg))
		} else if (interaction.replied) {
			await this.awaitIt(await interaction.followUp(discordMsg))
		} else {
			await this.awaitIt(await interaction.reply(discordMsg))
		}
	}

	private async awaitIt(
		message: Message<boolean> | InteractionResponse<boolean>
	) {
		const component = await message
			.awaitMessageComponent({
				filter: (i) =>
					i.user.id === this.settings.userId &&
					i.customId.startsWith(`x-${this.settings.id}`),
				time: this.settings.timeout,
				componentType: ComponentType.Button
			})
			.catch(() => null)
		if (!component) return message.edit({ components: [] }).catch(() => null)
		await this.handleDiscordInteraction(component)
	}

	private async handleDiscordInteraction(interaction: ButtonInteraction) {
		const page = parseInt(interaction.customId.split("-")[1].split(",")[1])
		const message = this.getDiscordMessage(page)
		await interaction.update(message)
		this.emit("pageChange", page)
		await this.awaitIt(interaction.message)
	}

	private getDiscordMessage(page = 1): PaginatorMessage {
		const data = this.pages[page - 1]
		if (!data) throw new Error("No page data found for paginator.")
		const toSend = { ...data }
		const generatedButtons = this.generateDiscordComponents(page)
		toSend.components = toSend.components
			? [...toSend.components, ...generatedButtons]
			: generatedButtons
		return toSend
	}

	private generateDiscordComponents(
		thisPage = 1
	): NonNullable<PaginatorMessage["components"]> {
		if (this.pages.length === 1) return []
		const { previous, next } = this.getPrevNext(thisPage)
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
			new ButtonBuilder()
				.setCustomId(`x-${this.settings.id},${previous},p`)
				.setDisabled(thisPage === 1)
				.setLabel("Previous")
				.setStyle(2),
			new ButtonBuilder()
				.setCustomId(`x-disabledpagecount`)
				.setDisabled(true)
				.setLabel(`Page ${thisPage}/${this.pages.length}`)
				.setStyle(2),
			new ButtonBuilder()
				.setCustomId(`x-${this.settings.id},${next},n`)
				.setDisabled(thisPage === this.pages.length)
				.setLabel("Next")
				.setStyle(2)
		])

		return [row]
	}

	private getPrevNext(page: number): { previous: number; next: number } {
		const previous = page - 1 < 1 ? 1 : page - 1
		const next = page + 1 > this.pages.length ? this.pages.length : page + 1
		return { previous, next }
	}
}
