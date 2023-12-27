import { checkAccess, titleCase } from "@buape/functions"
import { APIEmbed, Message } from "discord.js"
import { BetterClient, TextCommandOptions } from "../index.js"

export default class TextCommand {
	public readonly client: BetterClient
	public readonly key: string
	private readonly restriction?: string

	constructor(key: string, client: BetterClient, options: TextCommandOptions) {
		this.key = key
		this.client = client
		if (this.restriction) this.restriction = options.restriction
	}

	public async validate(_message: Message): Promise<APIEmbed | null> {
		if (
			this.restriction &&
			!(await checkAccess(
				_message.author.id,
				this.restriction,
				this.client.config.accessSettings,
				this.client
			))
		) {
			return {
				title: "Missing Permissions",
				description: `This action can only be used by ${
					this.client.user?.username || "the bot"
				} ${titleCase(this.restriction)}s!`
			}
		}

		return null
	}
	// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	public async run(_message: Message, _args: string[]): Promise<any> {}
}
