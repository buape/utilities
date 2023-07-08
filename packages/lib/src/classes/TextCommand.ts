import { APIEmbed, Message } from "discord.js"
import { BetterClient, TextCommandOptions } from "../index.js"
import { checkAccess, titleCase } from "@buape/functions"

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
		if (this.restriction && !(await checkAccess(_message.author.id, this.restriction, this.client.config.accessSettings, this.client))) {
			return {
				title: "Missing Permissions",
				description: `This action can only be used by ${this.client.user?.username || "the bot"} ${titleCase(this.restriction)}s!`
			}
		}

		return null
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-function, @typescript-eslint/no-unused-vars
	public async run(_message: Message, _args: string[]): Promise<any> {}
}
