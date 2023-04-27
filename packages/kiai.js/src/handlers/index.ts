import { KiaiClient } from ".."

export { Blacklist } from "./Blacklist"
export { Leveling } from "./Leveling"
export { Multipliers } from "./Multipliers"
export { Rewards } from "./Rewards"
export { Settings } from "./Settings"

export class BaseHandler {
	public _client: KiaiClient
	constructor(client: KiaiClient) {
		this._client = client
	}
}
