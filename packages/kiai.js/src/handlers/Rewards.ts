import { KiaiClient } from "../index"

export class Rewards {
	_client: KiaiClient
	constructor(client: KiaiClient) {
		this._client = client
	}

	getRewards(guildId: string) {
		return {}
	}
	
	createReward() {
		return {}
	}

	clearRewards() {
		return {}
	}

	deleteReward() {
		return {}
	}
}
