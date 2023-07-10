import { RequestHandler } from "../RequestHandler"

export { Blacklist } from "./Blacklist"
export { Leveling } from "./Leveling"
export { Multipliers } from "./Multipliers"
export { Rewards } from "./Rewards"
export { Settings } from "./Settings"

export class BaseHandler {
    public _handler: RequestHandler
    constructor(handler: RequestHandler) {
        this._handler = handler
    }
}
