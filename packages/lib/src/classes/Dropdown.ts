import { APIEmbed, AnySelectMenuInteraction } from "discord.js"
import { BetterClient, DropdownOptions, _BaseComponent } from "../index.js"

export default class Dropdown extends _BaseComponent {
	constructor(key: string, client: BetterClient, options?: DropdownOptions) {
		super(key, client, options || {})
	}

	public override async specificValidate(
		_interaction: AnySelectMenuInteraction
	): Promise<APIEmbed | null> {
		if (
			this.authorOnly &&
			_interaction.user.id !== _interaction.message.interaction?.user.id
		) {
			return {
				title: "Missing Permissions",
				description: "This dropdown is not for you!"
			}
		}
		return null
	}

	public override async run(
		_interaction: AnySelectMenuInteraction
		// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	): Promise<any> {}
}
