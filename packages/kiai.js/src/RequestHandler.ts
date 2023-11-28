import { RateLimitError as APIRateLimitError } from "@buape/kiai-api-types"
import fetch from "node-fetch"
import { RequestInfo, RequestInit, Response } from "node-fetch"
import { RatelimitError, APIError } from "."
export class RequestHandler {
    baseURL: string
    apiKey: string
    debug: boolean
    fetchFunction: (url: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>
    constructor(
        baseURL: string,
        apiKey: string,
        debug = false,
        fetchFunction: (url: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response> = fetch
    ) {
        this.baseURL = baseURL
        this.apiKey = apiKey
        this.debug = debug
        this.fetchFunction = fetchFunction
    }

    async request(
        endpoint: string,
        method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
        query = {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: { [key: string]: any } = {},
        noError = false
    ) {
        const url = `${this.baseURL}${endpoint}${toQueryString(query)}`
        const options = {
            method,
            headers: {
                Authorization: this.apiKey,
                "Content-Type": "application/json"
            },
            body: body == null || Object.entries(body).length == 0 ? undefined : JSON.stringify(body),
            timeout: 15000
        }
        if (this.debug) console.debug(`Sending request to ${url}\nMethod:\n  ${options.method}\nParams:\n  ${JSON.stringify(query)}`)
        try {
            const res = await this.fetchFunction(url, options)
            if (res.status >= 200 && res.status < 300) {
                const json = await res.json()
                if (this.debug) console.debug("Success: \n", json)
                return json
            } else if (res.status === 429) {
                const json = (await res.json()) as APIRateLimitError
                if (this.debug) console.debug("Ratelimited: \n", res, json)
                if (noError) return json
                throw new RatelimitError(res)
            } else {
                try {
                    const text = await res.text()
                    if (this.debug) console.debug("API Error: \n", res, text)
                    throw new APIError(res, text)
                } catch (err) {
                    if (this.debug) console.debug("API Error: \n", res)
                    throw new APIError(res)
                }
            }
        } catch (err) {
            throw err
        }
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
        "%00": "\x00"
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
