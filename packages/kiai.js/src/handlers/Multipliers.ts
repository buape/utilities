import { KiaiClient } from "../index"

export class Multipliers {
	_client: KiaiClient
	constructor(client: KiaiClient) {
		this._client = client
	}

	getMultipliers(guildId: string) {
		return {}
	}

	createMultiplier(data) {
		return {}
	}

	resetMultipliers(guildId: string) {
		return {}
	}

	getMultiplier(guildId: string, type: string, id: string) {
		return {}
	}

	clearMultiplier(guildId: string, type: string, id: string) {
		return {}
	}
}
