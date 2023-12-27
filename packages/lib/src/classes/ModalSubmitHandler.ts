import path from "path"
import { generateEmbed, getFiles } from "@buape/functions"
import { ComponentType, ModalSubmitInteraction } from "discord.js"
import { BetterClient, LogLevel } from "../index.js"
import ModalSubmit from "./ModalSubmit.js"

export default class ModalSubmitHandler {
	/**
	 * Our client.
	 */
	private readonly client: BetterClient

	/**
	 * Create our ModalSubmitHandler.
	 * @param client - Our client.
	 */
	constructor(client: BetterClient) {
		this.client = client
	}

	/**
	 * Load all the modals in the Modals directory.
	 */
	public async loadModals() {
		try {
			const modalPath = path.join(
				this.client.__dirname,
				"src",
				"bot",
				"modalSubmits"
			)
			const parentFolders = getFiles(modalPath, "", true)

			for (const parentFolder of parentFolders) {
				const files = getFiles(path.join(modalPath, parentFolder), "js")

				for (const fileName of files) {
					const filePath = path.join(modalPath, parentFolder, fileName)
					const fileUrl = `file://${filePath.replace(/\\/g, "/")}`
					const modalFile = await import(fileUrl)
					const modal = new modalFile.default(this.client)
					this.client.modals.set(modal.name, modal)
				}
			}
		} catch (e) {
			console.log(e)
			this.client.log(
				"Failed to load files for modalSubmits handler",
				LogLevel.WARN
			)
		}
	}

	/**
	 * Reload all the modals in the Modals directory.
	 */
	public reloadButtBuilders() {
		this.client.modals.clear()
		this.loadModals()
	}

	/**
	 * Fetch the modal that starts with the provided customId.
	 * @param customId - The customId to search for.
	 * @returns The modal we've found.
	 */
	private fetchModal(customId: string): ModalSubmit | undefined {
		return this.client.modals.find((modal) => customId.startsWith(modal.name))
	}

	/**
	 * Handle the interaction created for this modal to make sure the user and client can execute it.
	 * @param interaction - The interaction created.
	 */
	public async handleModal(interaction: ModalSubmitInteraction) {
		const modal = this.fetchModal(interaction.customId)
		if (!modal) return

		const sudoAs = this.client.sudo.get(interaction.user.id)
		if (sudoAs) {
			const user = await this.client.users.fetch(sudoAs)
			if (!user)
				return interaction.reply(`Unable to sudo, user ${sudoAs} not found.`)
			this.client.log(
				`${interaction.user.tag} [${interaction.user.id}] sudo'd as ${sudoAs}`
			)
			interaction.user = user
			if (interaction.guild) {
				const member = await interaction.guild.members.fetch(sudoAs)
				if (!member)
					return interaction.reply(
						`Unable to sudo, user ${sudoAs} not in this guild and this is a guild only command.`
					)
				interaction.member = member
			}
		}

		return this.runModal(modal, interaction)
	}

	/**
	 * Execute our modal.
	 * @param Modal - The Modal we want to execute.
	 * @param interaction - The interaction for our modal.
	 */
	private async runModal(
		modal: ModalSubmit,
		interaction: ModalSubmitInteraction
	) {
		const optionData = interaction.components
			.map((x) => {
				const component = x.components[0]
				if (component.type === ComponentType.TextInput) {
					return `${component.customId}: ${component.value}`
				}
			})
			.join("\n")
		this.client.log(
			`${interaction.user.tag} [${interaction.user.id}] submitted the Modal ${modal.name}\n\`\`\`${optionData}\`\`\``
		)
		// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
		modal.run(interaction).catch(async (error: any): Promise<any> => {
			this.client.log(`${error}`, LogLevel.ERROR)
			if (error instanceof Error)
				this.client.log(`${error.stack}`, LogLevel.ERROR)
			const toSend = generateEmbed(
				"error",
				{
					title: "An Error Has Occurred",
					description:
						"An unexpected error was encountered while submitting, my developers have already been notified! Feel free to join my support server in the mean time!"
					// footer: { text: `Sentry Event ID: ${sentryId} ` },
				},
				[],
				true,
				this.client.config.supportServer
			)
			if (interaction.replied) return interaction.followUp(toSend)
			return interaction.reply({
				...toSend
			})
		})
	}
}
