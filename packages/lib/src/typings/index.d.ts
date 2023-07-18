import { AccessSettings } from "@buape/functions"
import {
    ApplicationCommandOptionData,
    ApplicationCommandType,
    ClientEvents,
    ClientOptions as DiscordClientOptions,
    PermissionsBitField
} from "discord.js"
import { ClientOptions as GuildedClientOptions } from "guilded.js"
export interface LibConfig {
	discordOptions: DiscordClientOptions
	guildedOptions: GuildedClientOptions
	accessSettings: AccessSettings
	supportServer: string
}

export enum LogLevel {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error",
	NULL = "null"
}

export interface EventOptions {
	name?: keyof ClientEvents | string
	once?: boolean
}

export interface BaseComponentOptions {
	permissions?: PermissionsBitField
	clientPermissions?: PermissionsBitField
	restriction?: string
	guildOnly?: boolean
	ownerOnly?: boolean
	authorOnly?: boolean
	cooldown?: number
}

export interface ApplicationCommandOptions extends BaseComponentOptions {
	description: string
	options?: ApplicationCommandOptionData[]
	type?: ApplicationCommandType
}
export type ButtonOptions = BaseComponentOptions
export type DropdownOptions = BaseComponentOptions
export type TextCommandOptions = Pick<BaseComponentOptions, "restriction">

export enum HandlerType {
	ApplicationCommand = "applicationCommands",
	Button = "buttons",
	Dropdown = "dropdowns",
	TextCommand = "textCommands"
}
