import { AutocompleteInteraction } from "discord.js"
import { BetterClient, ApplicationCommand, LogLevel } from "../index.js"

export default class AutocompleteHandler {
	/**
	 * Our client.
	 */
	private readonly client: BetterClient

	/**
	 * Create our AutocompleteHandler.
	 * @param client - Our client.
	 */
	constructor(client: BetterClient) {
		this.client = client
	}

	/**
	 * Fetch the autocomplete with the provided name.
	 * @param name - The name to search for.
	 * @returns The autocomplete we've found.
	 */
	private fetchAutocomplete(name: string): ApplicationCommand | undefined {
		return this.client.applicationCommands.find((autocomplete) => autocomplete.key === name)
	}

	/**
	 * Handle the interaction created for this autocomplete to make sure the user and client can execute it.
	 * @param interaction - The interaction created.
	 */
	public async handleAutocomplete(interaction: AutocompleteInteraction) {
		const autocomplete = this.fetchAutocomplete(interaction.commandName)
		if (!autocomplete) return

		return this.runAutocomplete(autocomplete, interaction)
	}

	/**
	 * Execute our autocomplete.
	 * @param autocomplete - The autocomplete we want to execute.
	 * @param interaction - The interaction for our autocomplete.
	 */
	private async runAutocomplete(autocomplete: ApplicationCommand, interaction: AutocompleteInteraction) {
		const focused = interaction.options.getFocused(true)

		autocomplete
			.autocomplete(interaction, focused)

						.catch(async (error): Promise<any> => {
				this.client.log(error, LogLevel.ERROR)
				if (!interaction.responded) return interaction.respond([])
			})
	}
}
