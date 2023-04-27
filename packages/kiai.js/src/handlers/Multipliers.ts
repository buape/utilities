import { ChannelMultiplier, GuildMultiplier, Message, Multiplier, RoleMultiplier } from "@buape/kiai-api-types"
import { BaseHandler } from "."

export class Multipliers extends BaseHandler {
	async getMultipliers(guildId: string) {
		const result = (await this._client._requestHandler.request(`/guild/${guildId}/multipliers`)) as Multiplier[]
		return result
	}

	async createMultiplier(guildId: string, data: Multiplier) {
		const result = (await this._client._requestHandler.request(`/guild/${guildId}/multipliers`, "POST", {}, data)) as Message
		return result
	}

	async resetMultipliers(guildId: string) {
		const result = (await this._client._requestHandler.request(`/guild/${guildId}/multipliers`, "DELETE")) as { channels: number; roles: number }
		return result
	}

	async getMultiplier(guildId: string, type: "channel" | "role" | "guild", id: string) {
		const result = await this._client._requestHandler.request(`/guild/${guildId}/multipliers/${type}${type === "guild" ? "" : `/${id}`}`)
		switch (type) {
			case "channel":
				return result as ChannelMultiplier
			case "role":
				return result as RoleMultiplier
			case "guild":
				return result as GuildMultiplier
		}
	}

	async clearMultiplier(guildId: string, type: "channel" | "role" | "guild", id: string) {
		const result = (await this._client._requestHandler.request(
			`/guild/${guildId}/multipliers/${type}${type === "guild" ? "" : `/${id}`}`,
			"DELETE"
		)) as Message
		return result
	}
}
