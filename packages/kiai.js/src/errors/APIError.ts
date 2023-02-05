/**
 * @extends Error
 * @property {string} name The type of error (APIError)
 * @property {number} status HTTP status of the error
 * @property {string} message The message of this error
 */

import { Message } from "@buape/kiai-api-types"
import { Response } from "node-fetch"

export class APIError extends Error {
    name: string
    status: number
    message: string

    constructor(response: Response, message?: Message) {
        super()
        this.name = this.constructor.name
        this.status = response.status
        this.message = message ? message.message : "No message provided"
    }
}
