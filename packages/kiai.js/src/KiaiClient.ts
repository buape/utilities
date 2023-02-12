import { LevelData, Message } from "@buape/kiai-api-types"
import { RequestHandler } from "./RequestHandler"

export class KiaiClient {
    apiKey: string
    baseURL: string
    debug: boolean

    private _requestHandler: RequestHandler

    /**
     * Create a new KiaiClient
     * @param apiKey The API key to use
     * @param options The options to use
     * @param options.baseURL The base URL to use
     * @param options.debug Whether to enable debug mode
     * @constructor
     */
    constructor(apiKey: string, options?: { baseURL?: string; debug?: boolean }) {
        this.apiKey = apiKey
        this.baseURL = options?.baseURL || "https://beta.kiaibot.com/api/v1" //TODO: Remove beta once the API is out of beta
        this.debug = options?.debug || false
        this._requestHandler = new RequestHandler(this)
    }

    /**
     * Get the current status of the API
     * @returns {Promise<Message>}
     */
    public getStatus = async (): Promise<Message> => {
        return (await this._requestHandler.request("/status", {}, "GET", {})) as Message
    }

    /**
     * Get the current leveling data of a user
     * @param userId The Discord ID of the user
     * @param guildId The Discord ID of the guild
     * @returns {Promise<LevelData>}
     */
    public getData = async (userId: string, guildId: string): Promise<LevelData> => {
        return (await this._requestHandler.request(`/guild/${guildId}/rank/${userId}`, {}, "GET", {})) as LevelData
    }

    /**
     * Add XP to a user
     * @param userId The Discord ID of the user
     * @param guildId The Discord ID of the guild
     * @param xp The amount of XP to add (set to negative to remove XP)
     * @returns {Promise<LevelData>}
     */
    public addXp = async (userId: string, guildId: string, xp: number): Promise<LevelData> => {
        return (await this._requestHandler.request(`/guild/${guildId}/editXp/${userId}`, {}, "POST", { xp })) as LevelData
    }

    /**
     * Set the XP of a user
     * @param userId The Discord ID of the user
     * @param guildId The Discord ID of the guild
     * @param xp The amount of XP to set
     * @returns {Promise<LevelData>}
     */
    public setXp = async (userId: string, guildId: string, xp: number): Promise<LevelData> => {
        return (await this._requestHandler.request(`/guild/${guildId}/editXp/${userId}`, {}, "PUT", { xp })) as LevelData
    }
}
