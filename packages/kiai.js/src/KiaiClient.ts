import { Message, RateLimitError, VirtualMessage } from "@buape/kiai-api-types"
import { RequestHandler } from "./RequestHandler"
import * as handlers from "./handlers"
import fetch from "node-fetch"
import { RequestInfo, RequestInit, Response } from "node-fetch"

export class KiaiClient {
	apiKey: string
	baseURL: string
	version: `v${string}`
	debug: boolean
	_requestHandler: RequestHandler

	blacklist: handlers.Blacklist
	leveling: handlers.Leveling
	multipliers: handlers.Multipliers
	rewards: handlers.Rewards
	settings: handlers.Settings

	/**
	 * Create a new KiaiClient
	 * @param apiKey The API key to use
	 * @param options The options to use
	 * @param options.baseURL The base URL to use
	 * @param options.debug Whether to enable debug mode
	 * @constructor
	 */
	constructor(apiKey: string, options?: { baseURL?: string; version: `v${number}`; debug?: boolean; fetchFunction: ((url: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>) }) {
		this.apiKey = apiKey
		this.version = options?.version || "v1"
		this.baseURL = options?.baseURL || `https://api.kiaibot.com/${this.version}`
		this.debug = options?.debug || false
		this._requestHandler = new RequestHandler(this.baseURL, this.apiKey, this.debug, options?.fetchFunction ?? fetch)

		this.blacklist = new handlers.Blacklist(this._requestHandler)
		this.leveling = new handlers.Leveling(this._requestHandler)
		this.multipliers = new handlers.Multipliers(this._requestHandler)
		this.rewards = new handlers.Rewards(this._requestHandler)
		this.settings = new handlers.Settings(this._requestHandler)
	}

	public async getRatelimit() {
		const res = await this._requestHandler.request("/ratelimit", "GET", {}, {}, true)
		return res as RateLimitError
	}

	public async createVirtualMessage(guildId: string, message: VirtualMessage) {
		const result = (await this._requestHandler.request(`/guilds/${guildId}/virtual-messages`, "POST", {}, message)) as Message
		return result
	}
}
