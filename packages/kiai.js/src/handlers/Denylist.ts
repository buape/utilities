import { Denylist as APIDenylist, Message } from "@buape/kiai-api-types"
import { BaseHandler } from "./BaseHandler"

export class Denylist extends BaseHandler {
	async getDenylists(guildId: string) {
		const result = (await this._handler.request(
			`/guild/${guildId}/denylist`
		)) as APIDenylist[]
		return result
	}

	async createDenylist(guildId: string, data: APIDenylist) {
		const result = (await this._handler.request(
			`/guild/${guildId}/denylist`,
			"POST",
			{},
			data
		)) as Message
		return result
	}

	async deleteAllDenylists(guildId: string) {
		const result = (await this._handler.request(
			`/guild/${guildId}/denylist`,
			"DELETE"
		)) as {
			users: number
			roles: number
			channels: number
		}
		return result
	}

	async deleteDenylist(guildId: string, data: APIDenylist) {
		const result = (await this._handler.request(
			`/guild/${guildId}/denylist/${data.type}/${data.id}`,
			"DELETE"
		)) as Message
		return result
	}
}

// TODO: Remove in the next major version
/** @deprecated use `Denylist` */
export class Blacklist extends Denylist {
	/** @deprecated use `getDenylists` */
	getBlacklists = this.getDenylists

	/** @deprecated use `createDenylist` */
	createBlacklist = this.createDenylist

	/** @deprecated use `deleteAllDenylists` */
	deleteAllBlacklists = this.deleteAllDenylists

	/** @deprecated use `deleteDenylist` */
	deleteBlacklist = this.deleteDenylist
}
