import { KiaiClient } from "../index"

export class Leveling {
	_client: KiaiClient
	constructor(client: KiaiClient) {
		this._client = client
	}

	getLeaderboard(guildId: string) {
		return {}
	}

	getMember(guildId: string, userId: string) {
		return {}
	}

	addXp(guildId: string, userId: string, xp: number) {
		return {}
	}

	removeXp(guildId: string, userId: string, xp: number) {
		return this.addXp(guildId, userId, -xp)
	}

	setXp(guildId: string, userId: string, xp: number) {
		return {}
	}

	setXpBulk(guildId: string, data: { userId: string; xp: number }[]) {
		return {}
	}
}
