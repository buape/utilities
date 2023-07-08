export * from "./accessCheck.js"
export * from "./emojiList.js"
export * from "./generateEmbed.js"
export * from "./generateTimestamp.js"
export * from "./getFiles.js"
export * from "./parseUser.js"
export * from "./randomInt.js"
export * from "./titleCase.js"
export * from "./uploadHaste.js"

import { APIEmbed, ActionRowBuilder, ButtonBuilder } from "discord.js"

export interface GeneratedMessage {
	embeds?: APIEmbed[]
	components?: ActionRowBuilder<ButtonBuilder>[]
	ephemeral?: boolean
	content?: string
	fetchReply?: boolean
}