import { LibClient, LogLevel, ReceivedInteraction } from "../index.js"
import { CacheType, Interaction } from "discord.js"

export default class DiscordListeners {
    client: LibClient
    constructor(client: LibClient) {
        this.client = client
    }

    public async startListening() {
        this.client.discordClient.on("interactionCreate", (interaction) => {
            this.interaction(interaction)
        })
    }

    public async stopListening() {
        this.client.discordClient.off("interactionCreate", (interaction) => {
            this.interaction(interaction)
        })
    }

    private async interaction(discordInteraction: Interaction<CacheType>) {
        this.client.log(`Interaction: ${discordInteraction.id}`, LogLevel.DEBUG)

        if (!discordInteraction.isCommand()) return

        const interaction = new ReceivedInteraction(this.client, {
            key: discordInteraction.commandName,
            source: "discord"
        })

        this.client.applicationCommandHandler.handleComponent(interaction)
    }
}
