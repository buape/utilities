import { Leaderboard, LevelData, Message } from "@buape/kiai-api-types"
import { BaseHandler } from "."

export class Leveling extends BaseHandler {
    async getLeaderboard(guildId: string) {
        const result = (await this._handler.request(`/guild/${guildId}/leaderboard`)) as Leaderboard
        return result
    }

    async getMember(guildId: string, userId: string) {
        const result = (await this._handler.request(`/guild/${guildId}/member/${userId}`)) as LevelData
        return result
    }

    async addXp(guildId: string, userId: string, xp: number) {
        const result = (await this._handler.request(
            `/guild/${guildId}/member/${userId}/xp`,
            "PATCH",
            {},
            {
                xp
            }
        )) as Message
        return result
    }

    async removeXp(guildId: string, userId: string, xp: number) {
        const result = (await this._handler.request(
            `/guild/${guildId}/member/${userId}/xp`,
            "PATCH",
            {},
            {
                xp,
                remove: true
            }
        )) as Message
        return result
    }

    async setXp(guildId: string, userId: string, xp: number) {
        const result = (await this._handler.request(`/guild/${guildId}/member/${userId}/xp`, "PUT", {}, { xp })) as Message
        return result
    }

    async setXpBulk(guildId: string, data: { userId: string; xp: number }[]) {
        const result = (await this._handler.request(`/guild/${guildId}/members/xp`, "PUT", {}, { data })) as Message
        return result
    }
}
