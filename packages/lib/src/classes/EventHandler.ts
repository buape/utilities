import { ClientEvents } from "discord.js"
import {
	BetterClient,
	EventEmitterLike,
	EventOptions,
	LogLevel
} from "../index.js"

export default class EventHandler {
	public readonly name: keyof ClientEvents | string
	public readonly client: BetterClient

	private readonly emitter?: EventEmitterLike
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
		this.emitter = options.emitter
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
		const emitter = this.emitter || this.client
		if (this.once) return emitter.once(this.name, this._listener)
		return emitter.on(this.name, this._listener)
	}

	/**
	 * Stop listening for our event.
	 */
	public removeListener() {
		const emitter = this.emitter || this.client
		return emitter.off(this.name, this._listener)
	}
}
