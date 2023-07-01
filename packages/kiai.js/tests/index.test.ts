import { KiaiClient, RatelimitError } from "../src/index"
import { expect, expectTypeOf, test } from "vitest"

if (!process.env.API_KEY) throw new Error("No API key provided")

export const testServer = "1041045270659604701"
export const testUser = "1068978554223738991"

const client = new KiaiClient(process.env.API_KEY, {
	baseURL: "https://api.kiaibot.com",
	version: "v1",
	debug: false
})

test("The client initalizes properly", async () => {
	expect(client).toBeDefined()
	expect(client).toBeInstanceOf(KiaiClient)
	expect(client.apiKey).toBe(process.env.TEST_API_KEY)
	expect(client.version).toBe("v1")
	expect(client.baseURL).toBe("https://api.kiaibot.com/v1")
	expect(client.debug).toBe(false)
})

test("The client can get ratelimits", async () => {
	const res = await client.getRatelimit()
	expect(res).toBeDefined()
	expect(res).toBeInstanceOf(RatelimitError)
})
