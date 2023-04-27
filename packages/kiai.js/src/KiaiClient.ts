import { RateLimitError } from "@buape/kiai-api-types"
import { RequestHandler } from "./RequestHandler"
import * as handlers from "./handlers"

export class KiaiClient {
	apiKey: string
	baseURL: string
	debug: boolean

	blacklist = new handlers.Blacklist(this)
	leveling = new handlers.Leveling(this)
	multipliers = new handlers.Multipliers(this)
	rewards = new handlers.Rewards(this)
	settings = new handlers.Settings(this)

	_requestHandler: RequestHandler

	/**
	 * Create a new KiaiClient
	 * @param apiKey The API key to use
	 * @param options The options to use
	 * @param options.baseURL The base URL to use
	 * @param options.debug Whether to enable debug mode
	 * @constructor
	 */
	constructor(apiKey: string, options?: { baseURL?: string; debug?: boolean }) {
		this.apiKey = apiKey
		this.baseURL = options?.baseURL || "https://api.kiaibot.com/v1"
		this.debug = options?.debug || false
		this._requestHandler = new RequestHandler(this)
	}

	public async getRatelimit() {
		const res = await this._requestHandler.request("/ratelimit", "GET", {}, {}, true)
		return res as RateLimitError
	}

	public async createVirtualMessage() {
		return {}
	}
}
