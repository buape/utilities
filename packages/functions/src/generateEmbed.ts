import { ActionRowBuilder, APIEmbed, ButtonBuilder, ButtonStyle, ColorResolvable, EmbedBuilder } from "discord.js"
import { GeneratedMessage } from "./index.js"

/**
 * Generate a message with the specified type (error, success, or warning).
 * @param type - The type of the message: 'error', 'success', or 'warning'.
 * @param embedInfo - The information to build our embed with.
 * @param components - The components for our message.
 * @param ephemeral - Whether our message should be ephemeral or not.
 * @param supportServer - Whether or not to add the support server link as a component (for error messages only).
 * @returns The generated message.
 */
export const generateEmbed = (
	type: "error" | "success" | "warning",
	embedInfo: APIEmbed,
	components: ActionRowBuilder<ButtonBuilder>[] = [],
	ephemeral = false,
	supportServer: string | undefined = undefined
): GeneratedMessage => {
	let color: ColorResolvable
	switch (type) {
		case "error":
			color = 0xed4245
			break
		case "success":
			color = 0x57f287
			break
		case "warning":
			color = 0xfee75c
			break
		default:
			throw new Error(`Invalid message type: ${type}`)
	}

	const embed = new EmbedBuilder(embedInfo).setColor(color).data
	const embeds = [embed]

	const message: GeneratedMessage = {
		embeds,
		components,
		ephemeral
	}

	if (type === "error" && supportServer) {
		const supportServerButton = new ButtonBuilder({
			label: "Support Server",
			url: supportServer,
			style: ButtonStyle.Link
		})

		const supportServerComponent = new ActionRowBuilder<ButtonBuilder>().addComponents(supportServerButton)

		message.components?.push(supportServerComponent)
	}

	return message
}
