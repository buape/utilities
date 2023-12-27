import path from "path"
import { generateEmbed, getFiles } from "@buape/functions"
import { Message } from "discord.js"
import { BetterClient, LogLevel, TextCommand } from "../index.js"

export default class TextCommandHandler {
	public client: BetterClient
	private customPrefix?: string

	constructor(client: BetterClient, prefix?: string) {
		this.client = client
		this.customPrefix = prefix
	}

	public async loadFiles() {
		try {
			const textCommandsPath = path.join(
				this.client.__dirname,
				"src",
				"bot",
				"textCommands"
			)
			const parentFolders = getFiles(textCommandsPath, "", true)

			for (const parentFolder of parentFolders) {
				const files = getFiles(path.join(textCommandsPath, parentFolder), "js")

				for (const fileName of files) {
					const filePath = path.join(textCommandsPath, parentFolder, fileName)
					const fileUrl = `file://${filePath.replace(/\\/g, "/")}`
					const textCommands = await import(fileUrl)
					const textCommand = new textCommands.default(this.client)
					this.client.textCommands.set(textCommand.key, textCommand)
				}
			}
		} catch (e) {
			console.log(e)
			this.client.log(
				"Failed to load files for textCommands handler",
				LogLevel.WARN
			)
		}
	}

	public reloadFiles() {
		this.client.textCommands.clear()
		this.loadFiles()
	}

	public fetchCommand(key: string) {
		return this.client.textCommands.get(key) || undefined
	}

	public async handle(message: Message) {
		const prefix = this.customPrefix ?? `<@${this.client.user?.id}> `
		if (!prefix || !message.content.startsWith(prefix)) return
		const args = message.content.slice(prefix.length).trim().split(/ +/g)
		const commandName = args.shift()?.toLowerCase()
		const command = this.fetchCommand(commandName || "")
		if (!command) return

		const missingPermissions = await command.validate(message)
		if (missingPermissions)
			return message.reply(generateEmbed("error", missingPermissions))

		return this.runCommand(command, message, args)
	}

	private async runCommand(
		command: TextCommand,
		message: Message,
		args: string[]
	) {
		this.client.usersUsingBot.add(message.author.id)
		// biome-ignore lint/suspicious/noExplicitAny: This can truly be any
		await command.run(message, args).catch(async (error: any): Promise<any> => {
			this.client.log(`${error}`, LogLevel.ERROR)
			if (error instanceof Error)
				this.client.log(`${error.stack}`, LogLevel.ERROR)
			return message.reply(
				generateEmbed("error", {
					title: "An Error Has Occurred",
					description: `An unexpected error was encountered while running \`${command.key}\`, my developers have already been notified! Feel free to join my support server in the mean time!`
				})
			)
		})
		this.client.usersUsingBot.delete(message.author.id)
	}
}
