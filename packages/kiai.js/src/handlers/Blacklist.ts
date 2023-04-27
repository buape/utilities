import { BaseHandler } from "."
import { Blacklist as APIBlacklist, Message } from "@buape/kiai-api-types"

export class Blacklist extends BaseHandler {
	async getBlacklists(guildId: string) {
		const result = (await this._client._requestHandler.request(`/guild/${guildId}/blacklist`)) as APIBlacklist[]
		return result
	}

	async createBlacklist(guildId: string, data: APIBlacklist) {
		const result = (await this._client._requestHandler.request(`/guild/${guildId}/blacklist`, "POST", {}, data)) as Message
		return result
	}

	async deleteAllBlacklists(guildId: string) {
		const result = (await this._client._requestHandler.request(`/guild/${guildId}/blacklist`, "DELETE")) as {
			users: number
			roles: number
			channels: number
		}
		return result
	}

	async deleteBlacklist(guildId: string, data: APIBlacklist) {
		const result = (await this._client._requestHandler.request(`/guild/${guildId}/blacklist/${data.type}/${data.id}`, "DELETE")) as Message
		return result
	}
}
