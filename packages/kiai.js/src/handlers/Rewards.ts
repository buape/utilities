import { Message, Reward } from "@buape/kiai-api-types"
import { BaseHandler } from "."

export class Rewards extends BaseHandler {
	async getRewards(guildId: string) {
		const result = (await this._handler.request(
			`/guild/${guildId}/rewards`
		)) as Reward[]
		return result
	}

	async createReward(guildId: string, data: Reward) {
		const result = (await this._handler.request(
			`/guild/${guildId}/rewards`,
			"POST",
			{},
			data
		)) as Message
		return result
	}

	async clearRewards(guildId: string) {
		const result = (await this._handler.request(
			`/guild/${guildId}/rewards`,
			"DELETE"
		)) as Message
		return result
	}

	async deleteReward(guildId: string, id: string) {
		const result = (await this._handler.request(
			`/guild/${guildId}/rewards/${id}`,
			"DELETE"
		)) as Message
		return result
	}
}
