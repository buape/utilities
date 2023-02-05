import { Message } from "@buape/kiai-api-types"
import fetch from "node-fetch"
import { APIError } from "./errors/APIError"
import { RatelimitError } from "./errors/RatelimitError"
import { KiaiClient } from "./KiaiClient"
export class RequestHandler {
    _client: KiaiClient
    constructor(client: KiaiClient) {
        this._client = client
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async request(endpoint: string, query = {}, method = "GET", body: { [key: string]: any }, _attempts = 0) {
        return new Promise(async (resolve, reject) => {
            const url = `${this._client.baseURL}${endpoint}${toQueryString(query)}`
            const options = {
                method,
                headers: {
                    Authorization: this._client.apiKey,
                    "Content-Type": "application/json",
                },
                body: body == null || Object.entries(body).length == 0 ? undefined : JSON.stringify(body),
                timeout: 15000,
            }
            if (this._client.debug) console.debug(`Sending request to ${url}\nMethod:\n  ${options.method}\nParams:\n  ${JSON.stringify(query)}`)
            try {
                const res = await fetch(url, options)
                if (res.status >= 200 && res.status < 300) {
                    const json = (await res.json()) as Message
                    resolve(json)
                    if (this._client.debug) console.debug("Success: \n", json)
                } else if (res.status === 429) {
                    const json = (await res.json()) as Message
                    if (this._client.debug) console.debug("Ratelimited: \n", res, json)
                    reject(new RatelimitError(res))
                } else {
                    try {
                        const json = (await res.json()) as Message
                        if (this._client.debug) console.debug("API Error: \n", res, json)
                        reject(new APIError(res, json))
                    } catch (err) {
                        if (this._client.debug) console.debug("API Error: \n", res)
                        reject(new APIError(res))
                    }
                }
            } catch (err) {
                reject(err)
            }
        })
    }
}

type replacerType = "!" | "'" | "(" | ")" | "~" | "%20" | "%00"

const encode = (str: string) => {
    const charMap = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\x00",
    } as const
    return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, (match) => {
        return charMap[match as replacerType]
    })
}
const toQueryString = (data: { [key: string]: string }) => {
    if (Object.entries(data).length == 0) return ""
    let result = ""
    for (const [key, value] of Object.entries(data)) {
        result.length == 0 ? (result = "?") : (result += "&")
        result += `${encode(key)}=${encode(value)}`
    }
    return result
}
