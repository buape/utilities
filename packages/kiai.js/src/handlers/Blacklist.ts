import { KiaiClient } from "../index"

export class Blacklist {
	_client: KiaiClient
	constructor(client: KiaiClient) {
		this._client = client
	}

	getBlacklists(guildId: string) {
		return {}
	}

	createBlacklist(guildId: string, type: "guild" | "channel" | "role", value: string) {
		return {}
	}

	deleteAllBlacklists(guildId: string) {
		return {}
	}

	deleteBlacklist(guildId: string, type: "guild" | "channel" | "role", id: string) {
		return {}
	}
}
