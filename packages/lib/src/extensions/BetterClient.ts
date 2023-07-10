import { resolve } from "path"
import { Client, Collection, Locale, Snowflake } from "discord.js"
import { getFiles, uploadHaste } from "@buape/functions"
import {
    ApplicationCommand,
    ApplicationCommandHandler,
    AutocompleteHandler,
    Button,
    ButtonHandler,
    Dropdown,
    DropdownHandler,
    EventHandler,
    LibConfig,
    LogLevel,
    ModalSubmit,
    ModalSubmitHandler,
    TextCommand,
    TextCommandHandler
} from "../index.js"
import path from "path"

export default class BetterClient extends Client {
    public readonly applicationCommandHandler: ApplicationCommandHandler
    public applicationCommands: Collection<string, ApplicationCommand>
    public readonly textCommandHandler: TextCommandHandler
    public textCommands: Collection<string, TextCommand>
    public readonly buttonHandler: ButtonHandler
    public buttons: Collection<string, Button>
    public readonly dropdownHandler: DropdownHandler
    public dropdowns: Collection<string, Dropdown>
    public readonly autocompleteHandler: AutocompleteHandler
    public readonly modalSubmitHandler: ModalSubmitHandler
    public modals: Collection<string, ModalSubmit>
    public events: Map<string, EventHandler>
    public hasteStore: Collection<string, string[]>
    public sudo: Collection<Snowflake, Snowflake> = new Collection()
    public localeCache: Collection<Snowflake, Locale> = new Collection()
    public userChannelCache: Collection<`${Snowflake}-${Snowflake}`, Snowflake>
    public config: LibConfig

    /**
	 * __dirname is not in our version of ECMA, so we make do with a shitty fix.
	 */
    public readonly __dirname: string

    /**
	 * Create our client.
	 * @param options - The options for our client.
	 */
    constructor(config: LibConfig) {
        super(config.clientOptions)
        this.config = config

        this.__dirname = `${resolve()}/dist`

        this.applicationCommandHandler = new ApplicationCommandHandler(this)
        this.applicationCommands = new Collection()
        this.autocompleteHandler = new AutocompleteHandler(this)

        this.textCommandHandler = new TextCommandHandler(this)
        this.textCommands = new Collection()

        this.buttonHandler = new ButtonHandler(this)
        this.buttons = new Collection()

        this.dropdownHandler = new DropdownHandler(this)
        this.dropdowns = new Collection()

        this.modalSubmitHandler = new ModalSubmitHandler(this)
        this.modals = new Collection()

        this.events = new Map()

        this.hasteStore = new Collection()
        this.localeCache = new Collection()
        this.userChannelCache = new Collection()

        this.dropdownHandler.loadFiles()
        this.buttonHandler.loadFiles()
        this.applicationCommandHandler.loadFiles()
        this.textCommandHandler.loadFiles()
        this.modalSubmitHandler.loadModals()
        this.loadEvents()
    }

    /**
	 * Load all the events in the events directory.
	 */
    private async loadEvents() {
        try {
            const eventsPath = path.join(this.__dirname, "src", "bot", "events")
            const eventFileNames = getFiles(eventsPath, "js", true)

            await Promise.all(
                eventFileNames.map(async (eventFileName) => {
                    try {
                        const filePath = path.join(eventsPath, eventFileName)
                        const fileUrl = `file://${filePath.replace(/\\/g, "/")}`

                        const eventFile = await import(fileUrl)
                        const eventName = eventFileName.split(".")[0]
                        const event = new eventFile.default(this, eventName)
                        event.listen()

                        this.events.set(event.name, event)
                    } catch (error) {
                        this.log(`Failed to load event file: ${eventFileName} - ${error}`, LogLevel.ERROR)
                    }
                })
            )
        } catch (e) {
            this.log(`Failed to load files for events handler: ${e}`, LogLevel.WARN)
        }
    }

    /**
	 * Reload all the events in the events directory.
	 */
    public reloadEvents() {
        this.events.forEach((event) => event.removeListener())
        this.loadEvents()
    }

    /**
	 * Log to the console. This function can be overridden to provide a custom logger.
	 * @param message - The message to log.
	 * @param level - The level of the log.
	 */
    public log = (message: string, level: LogLevel = LogLevel.INFO) => {
        switch (level) {
            case LogLevel.INFO:
                console.log(message)
                break
            case LogLevel.WARN:
                console.warn(message)
                break
            case LogLevel.ERROR:
                console.error(message)
                break
            case LogLevel.DEBUG:
                console.debug(message)
                break
            case LogLevel.NULL:
                break
            default:
                console.log(message)
                break
        }
    }

    /**
	 * This function is used when you want to slowly generate a hastebin.
	 * It provides a collection that can be accessed from the client, and will automatically append each string to a new line.
	 * You can use the {@link hasteFlush} function to upload the hastebin.
	 * @param id The ID of the store you are using.
	 * @param text The text to add to the store.
	 */
    public hasteLog(id: string, text: string) {
        const data = this.hasteStore.get(id) || []
        data.push(`${text}\n`)
        this.hasteStore.set(id, data)
    }

    /**
	 * This function is used to upload a hastebin stored using the {@link hasteLog} function.
	 * @param id - The ID of the store you are using.
	 * @param url - The URL to upload the hastebin to. If not provided, it will use the default hastebin.
	 * @returns The resulting URL
	 */
    public async hasteFlush(id: string, url?: string) {
        const raw = this.hasteStore.get(id) || []
        const final = raw.join("\n")
        if (url) {
            const data = await uploadHaste(final, "md", url)
            return data
        }
        const data = await uploadHaste(final, "md")
        return data
    }
}
