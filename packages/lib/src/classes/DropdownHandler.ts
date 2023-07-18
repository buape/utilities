import { LibClient, _BaseHandler, HandlerType } from "../index.js"

export default class DropdownHandler extends _BaseHandler {
    constructor(client: LibClient) {
        super(HandlerType.Dropdown, client)
    }
}
