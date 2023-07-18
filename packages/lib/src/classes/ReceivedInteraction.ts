import { ChatInputCommandInteraction } from "discord.js"
import { LibClient } from "../index.js"

export default class ReceivedInteraction {
    private readonly client: LibClient
    public readonly key: string
    public readonly source: "discord" | "guilded" | "http"
    public originalDiscord?: ChatInputCommandInteraction
    public readonly guild?: { id: string | null }

    constructor(client: LibClient, data: { key: string; source: "discord" | "guilded" | "http"; originalDiscord?: ChatInputCommandInteraction }) {
        this.client = client
        this.key = data.key
        this.source = data.source

        if (data.originalDiscord) {
            this.originalDiscord = data.originalDiscord
            if (data.originalDiscord.guild) this.guild = { id: data.originalDiscord.guild.id }
        }
    }

    public async reply({ content }: { content: string }) {
        switch (this.source) {
            case "discord":
                if (!this.originalDiscord) throw new Error("Cannot reply to a Discord interaction without the original interaction.")
                await this.originalDiscord.reply({ content })
                break
            case "guilded":
            case "http":
            default:
                throw new Error("Cannot reply to a non-Discord interaction.")
        }
        return
    }
}
