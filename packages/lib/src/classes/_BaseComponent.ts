import { checkAccess, titleCase } from "@buape/functions"
import { APIEmbed, BaseInteraction, PermissionsBitField } from "discord.js"
import { BaseComponentOptions, BetterClient, LogLevel } from "../index.js"

/**
 * The base component class that other components extend from.
 */
export default class BaseComponent {
	/**
	 * The client that instantiated this component.
	 */
	public readonly client: BetterClient
	/**
	 * The key of this component.
	 * This is used to identify the component, and is usually used as the custom ID or the command name.
	 */
	public readonly key: string
	/**
	 * The permissions required from the user to run this component.
	 */
	public readonly permissions?: PermissionsBitField
	/**
	 * Whether this component can be used in DMs.
	 */
	public readonly dmPermission?: boolean
	/**
	 * The permissions required from the application to run this component.
	 */
	private readonly clientPermissions?: PermissionsBitField
	/**
	 * The access role required to run this component.
	 */
	private readonly restriction?: string
	/**
	 * Whether this component can only be used in guilds.
	 */
	private readonly guildOnly: boolean
	/**
	 * Whether this component can only be used by the owner of the guild.
	 */
	private readonly ownerOnly: boolean
	/**
	 * The cooldown of this component.
	 * This is in milliseconds.
	 */
	public readonly cooldown: number
	/**
	 * Whether this component can only be used by the author of the interaction.
	 */
	public readonly authorOnly: boolean

	constructor(
		key: string,
		client: BetterClient,
		options: BaseComponentOptions
	) {
		this.key = key
		this.client = client
		if (options.permissions) this.permissions = options.permissions
		if (options.dmPermission) this.dmPermission = options.dmPermission
		if (options.clientPermissions)
			this.clientPermissions = options.clientPermissions
		this.restriction = options.restriction
		this.guildOnly = options.guildOnly || false
		this.ownerOnly = options.ownerOnly || false
		this.cooldown = options.cooldown || 0
		this.authorOnly = options.authorOnly || false
	}

	public async validate(
		interaction: BaseInteraction
	): Promise<APIEmbed | null> {
		if (this.guildOnly && !interaction.guild) {
			return {
				title: "Missing Permissions",
				description: "This action can only be used in guilds!"
			}
		}

		await interaction.guild?.fetch()

		if (interaction.guildId) {
			if (
				this.ownerOnly &&
				interaction.guild?.ownerId !== interaction.user.id
			) {
				return {
					title: "Missing Permissions",
					description:
						"This action can only be ran by the owner of this server!"
				}
			}
			if (
				this.permissions &&
				!interaction.memberPermissions?.has(this.permissions)
			) {
				return {
					title: "Missing Permissions",
					description: `You need the ${this.permissions
						.toArray()
						.map((permission) => `**${titleCase(permission)}**`)
						.join(", ")} permission${
						this.permissions.toArray().length > 1 ? "s" : ""
					} to run this action.`
				}
			}
			if (
				this.clientPermissions &&
				!interaction.guild?.members.me?.permissions.has(this.clientPermissions)
			) {
				return {
					title: "Missing Permissions",
					description: `I need the ${this.clientPermissions
						.toArray()
						.map((permission) => `**${titleCase(permission)}**`)
						.join(", ")} permission${
						this.clientPermissions.toArray().length > 1 ? "s" : ""
					} to run this action.`
				}
			}
		}

		if (
			this.restriction &&
			!(await checkAccess(
				interaction.user.id,
				this.restriction,
				this.client.config.accessSettings,
				this.client
			))
		) {
			return {
				title: "Missing Permissions",
				description: `This action can only be used by ${
					this.client.user?.username || "the bot"
				} ${this.restriction}s!`
			}
		}

		const specifics = await this.specificValidate(interaction)
		return specifics ?? null
	}

	public async specificValidate(
		_interaction: BaseInteraction
	): Promise<APIEmbed | null> {
		return null
	}
	// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	public async run(interaction: BaseInteraction): Promise<any> {
		this.client.log(`${interaction}`, LogLevel.NULL) // This line is here to prevent unused variable errors.
		throw new Error("Not implemented")
	}
}
