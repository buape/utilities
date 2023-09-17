import {
    ApplicationCommandOptionData,
    ApplicationCommandType,
    AutocompleteFocusedOption,
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction
} from "discord.js"
import { BetterClient, ApplicationCommandOptions } from "../index.js"
import BaseComponent from "./_BaseComponent.js"

export default class ApplicationCommand extends BaseComponent {
    /**
	 * The description of the command
	 */
    public readonly description: string
    /**
	 * The type of the command
	 * @default ApplicationCommandType.ChatInput
	 */
    public readonly type: ApplicationCommandType = ApplicationCommandType.ChatInput
    /**
	 * The options of the command
	 * @default []
	 */
    public readonly options: ApplicationCommandOptionData[] = []

    constructor(key: string, client: BetterClient, options: ApplicationCommandOptions) {
        super(key, client, options)
        this.description = options.description || ""
        this.options = options.options || []
        this.type = options.type || ApplicationCommandType.ChatInput
    }

    public override async run(
        _interaction: MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction | ChatInputCommandInteraction
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any> {}

    public async autocomplete(_interaction: AutocompleteInteraction, _option: AutocompleteFocusedOption): Promise<void> {}
}
