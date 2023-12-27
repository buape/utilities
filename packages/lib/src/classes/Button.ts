import { APIEmbed, ButtonInteraction } from "discord.js"
import { BetterClient, ButtonOptions, _BaseComponent } from "../index.js"

export default class Button extends _BaseComponent {
	constructor(key: string, client: BetterClient, options?: ButtonOptions) {
		super(key, client, options || {})
	}

	public override async specificValidate(
		_interaction: ButtonInteraction
	): Promise<APIEmbed | null> {
		if (
			this.authorOnly &&
			_interaction.user.id !== _interaction.message.interaction?.user.id
		) {
			return {
				title: "Missing Permissions",
				description: "This button is not for you!"
			}
		}
		return null
	}
	// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	public override async run(_interaction: ButtonInteraction): Promise<any> {}
}
