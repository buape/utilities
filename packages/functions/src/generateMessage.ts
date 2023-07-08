import { ActionRowBuilder, APIEmbed, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js"

/**
 * Generate a full error message with a simple helper function.
 * @param embedInfo - The information to build our embed with.
 * @param supportServer - A link to add as a button to the bottom of the message
 * @param components - The components for our message.
 * @param ephemeral - Whether our message should be ephemeral or not.
 * @returns The generated error message.
 */
export const generateErrorMessage = (embedInfo: APIEmbed, supportServer?: string | null, ephemeral = true): GeneratedMessage => {
	return {
		embeds: [new EmbedBuilder(embedInfo).setColor(0xed4245).data],
		components: supportServer
			? [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder({
						label: "Support Server",
						url: supportServer,
						style: ButtonStyle.Link
					})
				)
			  ]
			: [],
		ephemeral
	}
}

/**
 * Generate a full success message with a simple helper function.
 * @param embedInfo - The information to build our embed with.
 * @param components - The components for our message.
 * @param ephemeral - Whether our message should be ephemeral or not.
 * @returns The generated message.
 */
export const generateSuccessMessage = (
	embedInfo: APIEmbed,
	components: ActionRowBuilder<ButtonBuilder>[] = [],
	ephemeral = false
): GeneratedMessage => {
	return {
		embeds: [new EmbedBuilder(embedInfo).setColor(0x57f287).data],
		components,
		ephemeral
	}
}

/**
 * Generate a full warning message with a simple helper function.
 * @param embedInfo - The information to build our embed with.
 * @param components - The components for our message.
 * @param ephemeral - Whether our message should be ephemeral or not.
 * @returns The generated message.
 */
export const generateWarningMessage = (
	embedInfo: APIEmbed,
	components: ActionRowBuilder<ButtonBuilder>[] = [],
	ephemeral = false,
	fetchReply = false
): GeneratedMessage => {
	return {
		embeds: [new EmbedBuilder(embedInfo).setColor(0xfee75c).data],
		components,
		ephemeral,
		fetchReply
	}
}

export interface GeneratedMessage {
	embeds?: APIEmbed[]
	components?: ActionRowBuilder<ButtonBuilder>[]
	ephemeral?: boolean
	content?: string
	fetchReply?: boolean
}