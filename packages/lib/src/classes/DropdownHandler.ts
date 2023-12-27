import { BetterClient, HandlerType, _BaseHandler } from "../index.js"

export default class DropdownHandler extends _BaseHandler {
	constructor(client: BetterClient) {
		super(HandlerType.Dropdown, client)
	}
}
