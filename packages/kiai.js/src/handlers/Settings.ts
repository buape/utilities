import { KiaiClient } from "../index"

export class Settings {
	_client: KiaiClient
	constructor(client: KiaiClient) {
		this._client = client
	}

	getSettings(guildId: string) {
		return {}
	}

	getPermissions(guildId: string) {
		return {}
	}
}
