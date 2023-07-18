import { LibClient, _BaseHandler, HandlerType } from "../index.js"
export default class ButtonHandler extends _BaseHandler {
    constructor(client: LibClient) {
        super(HandlerType.Button, client)
    }
}
