import { BetterClient, HandlerType, _BaseHandler } from "../index.js"
export default class ButtonHandler extends _BaseHandler {
	constructor(client: BetterClient) {
		super(HandlerType.Button, client)
	}
}
