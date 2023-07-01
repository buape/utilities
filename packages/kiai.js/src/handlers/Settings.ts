import { ApiPermission, GuildSettings } from "@buape/kiai-api-types"
import { BaseHandler } from "."

export class Settings extends BaseHandler {
	async getSettings(guildId: string) {
		const result = (await this._handler.request(`/guild/${guildId}/settings`)) as GuildSettings
		return result
	}

	async getPermissions(guildId: string) {
		const result = (await this._handler.request(`/guild/${guildId}/permissions`)) as number
		const permissions: ApiPermission[] = []

		let bit = 0
		let num = result

		while (num > 0) {
			if (num & 1) {
				const permission = 1 << bit
				permissions.push(permission)
			}
			num >>= 1
			bit++
		}

		return permissions
	}
}
