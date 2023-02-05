import { LevelData, Message } from "@buape/kiai-api-types"
import { RequestHandler } from "./RequestHandler"

export class KiaiClient {
    apiKey: string
    baseURL: string
    debug: boolean

    private _requestHandler: RequestHandler

    constructor(apiKey: string, options?: { baseURL?: string; debug?: boolean }) {
        this.apiKey = apiKey
        this.baseURL = options?.baseURL || "https://beta.kiaibot.com/api/v1" //TODO: Remove beta once the API is out of beta
        this.debug = options?.debug || false
        this._requestHandler = new RequestHandler(this)
    }

    public getStatus = async (): Promise<Message> => {
        return (await this._requestHandler.request("/status", {}, "GET", {})) as Message
    }

    public getRank = async (userId: string, guildId: string): Promise<LevelData> => {
        return (await this._requestHandler.request(`/guild/${guildId}/rank/${userId}`, {}, "GET", {})) as LevelData
    }

    public addXp = async (userId: string, guildId: string, xp: number): Promise<LevelData> => {
        return (await this._requestHandler.request(`/guild/${guildId}/editXp/${userId}`, {}, "POST", { xp })) as LevelData
    }

    public setXp = async (userId: string, guildId: string, xp: number): Promise<LevelData> => {
        return (await this._requestHandler.request(`/guild/${guildId}/editXp/${userId}`, {}, "PUT", { xp })) as LevelData
    }
}
