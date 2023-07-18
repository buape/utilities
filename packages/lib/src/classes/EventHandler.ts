import { ClientEvents } from "discord.js"
import { LibClient, EventOptions, LogLevel } from "../index.js"

import path from "path"
import { fileURLToPath } from "url"

export default class EventHandler {
    public readonly name: keyof ClientEvents | string
    public readonly client: LibClient

    private readonly _listener
    private readonly once: boolean

    private __filename = fileURLToPath(import.meta.url)
    private __dirname = path.dirname(__filename)

    /**
	 * Create our event.
	 * @param client - Our client.
	 * @param options - The options for our event.
	 */
    constructor(client: LibClient, options: EventOptions) {
        this.name = options.name || this.__filename.slice(this.__dirname.length + 1, -3)
        this.client = client
        this._listener = this._run.bind(this)
        this.once = options.once || false
    }

    /**
	 * Execute our event.
	 * @param args - The arguments for our event.
	 */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _run(...args: any) {
        try {
            return await this.run(...args)
        } catch (error) {
            this.client.log(`${error}`, LogLevel.ERROR)
        }
    }

    /**
	 * Execute our event.
	 * @param _args - The arguments for our event.
	 */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async run(..._args: any): Promise<any> {}

    /**
	 * Listen for our event.
	 */
    public listen() {
        if (this.once) return this.client.discordClient.once(this.name, this._listener)
        return this.client.discordClient.on(this.name, this._listener)
    }

    /**
	 * Stop listening for our event.
	 */
    public removeListener() {
        return this.client.discordClient.off(this.name, this._listener)
    }
}
