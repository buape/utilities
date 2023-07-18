/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable guard-for-in */
import { Collection, ApplicationCommandData, CommandInteraction } from "discord.js"
import { LibClient, ApplicationCommand, _BaseHandler, _BaseComponent, HandlerType, LogLevel } from "../index.js"
import { generateEmbed } from "@buape/functions"
import { generateTimestamp } from "@buape/functions"

export default class ApplicationCommandHandler extends _BaseHandler {
    // Key is `${userID}-${commandName}`.
    private cooldowns: Collection<string, number>

    constructor(client: LibClient) {
        super(HandlerType.ApplicationCommand, client)
        this.cooldowns = new Collection()
    }

    public override postLoad() {
        return setTimeout(async () => {
            this.client.application?.commands.set(
                this.client.applicationCommands.map((command) => {
                    const data = this.getDiscordCommandData(command)
                    return data
                })
            )
            await Promise.all(
                this.client.guilds.cache.map((guild) =>
                    guild.commands.set([]).catch((error) => {
                        this.client.log(`${error}`, LogLevel.ERROR)
                    }))
            )
        }, 5000)
    }

    private getDiscordCommandData(command: ApplicationCommand) {
        const data: ApplicationCommandData = {
            name: command.key,
            description: command.description || "",
            options: command.options
        }
        return data
    }

    public override async specificChecks(interaction: CommandInteraction, component: _BaseComponent) {
        if (component.cooldown) {
            const cooldownKey = `${interaction.user.id}-${interaction.commandName}`
            const currentCooldown = this.cooldowns.get(cooldownKey)
            if (currentCooldown) {
                if (currentCooldown > Date.now()) {
                    return interaction.reply(
                        generateEmbed(
                            "error",
                            {
                                title: "You are on a cooldown!",
                                description: `Try again ${generateTimestamp({ timestamp: currentCooldown, type: "R" })}.`
                            },
                            [],
                            true,
                            this.client.config.supportServer
                        )
                    )
                }
                this.cooldowns.delete(cooldownKey)
            }
        }
    }
}
