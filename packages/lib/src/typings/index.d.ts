export interface LibConfig {
	clientOptions: ClientOptions
	accessSettings: AccessSettings
	supportServer: string
	prefix?: string
}

export enum LogLevel {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error",
	NULL = "null"
}

import { AccessSettings } from "@buape/functions"
import {
	ApplicationCommandOptionData,
	ApplicationCommandType,
	ClientEvents,
	ClientOptions,
	PermissionsBitField
} from "discord.js"

export interface EventEmitterLike {
	// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	on: (...args: any[]) => any
	// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	once: (...args: any[]) => any
	// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	off: (...args: any[]) => any
}

export interface EventOptions {
	name: keyof ClientEvents | (string & {})
	emitter?: EventEmitterLike
	once?: boolean
}

export interface BaseComponentOptions {
	permissions?: PermissionsBitField
	dmPermission?: boolean
	clientPermissions?: PermissionsBitField
	restriction?: string
	guildOnly?: boolean
	ownerOnly?: boolean
	authorOnly?: boolean
	cooldown?: number
}

export interface ApplicationCommandOptions extends BaseComponentOptions {
	description?: string
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
