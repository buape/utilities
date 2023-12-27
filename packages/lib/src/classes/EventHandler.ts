import { ClientEvents } from "discord.js"
import { BetterClient, EventOptions, LogLevel } from "../index.js"

export default class EventHandler {
	public readonly name: keyof ClientEvents | string
	public readonly client: BetterClient

	private readonly _listener
	private readonly once: boolean

	/**
	 * Create our event.
	 * @param client - Our client.
	 * @param options - The options for our event.
	 */
	constructor(client: BetterClient, options: EventOptions) {
		this.name = options.name
		this.client = client
		this._listener = this._run.bind(this)
		this.once = options.once || false
	}

	/**
	 * Execute our event.
	 * @param args - The arguments for our event.
	 */ // biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	private async _run(...args: any) {
		try {
			return await this.run(...args)
		} catch (error) {
			this.client.log(`${error}`, LogLevel.ERROR)
			if (error instanceof Error)
				this.client.log(`${error.stack}`, LogLevel.ERROR)
		}
	}

	/**
	 * Execute our event.
	 * @param _args - The arguments for our event.
	 */ // biome-ignore lint/suspicious/noExplicitAny: This can truly be any
	public async run(..._args: any): Promise<any> {}

	/**
	 * Listen for our event.
	 */
	public listen() {
		if (this.once) return this.client.once(this.name, this._listener)
		return this.client.on(this.name, this._listener)
	}

	/**
	 * Stop listening for our event.
	 */
	public removeListener() {
		return this.client.off(this.name, this._listener)
	}
}
