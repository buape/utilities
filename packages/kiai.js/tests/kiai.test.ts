import { KiaiClient } from "../index"
import { expect, expectTypeOf, test } from "vitest"
import { LevelData } from "@buape/kiai-api-types"

const testServer = "608098293498511360"
const testUser = "1068978554223738991"

const matchData: LevelData = {
    id: testUser,
    guildId: testServer,
    currentLevel: 1,
    nextLevel: 2,
    xp: 0,
    nextLevelXp: 100,
}

if (!process.env.TEST_API_KEY) throw new Error("No API key provided")

const client = new KiaiClient(process.env.TEST_API_KEY)

test("The client should have initalized properly", () => {
    expect(client).toBeInstanceOf(KiaiClient)
    expect(client.apiKey).toBe(process.env.TEST_API_KEY)
})

test("The client should be able to get a rank", async () => {
    const rank = await client.getData(testUser, testServer)
    expectTypeOf(rank).toEqualTypeOf(matchData)
})

test("The client should be able to add XP", async () => {
    const oldRank = await client.getData(testUser, testServer)
    const newRank = await client.addXp(testUser, testServer, 15)
    expect(newRank.xp).toBe(oldRank.xp + 15)
})

test("The client should be able to set XP", async () => {
    const newRank = await client.setXp(testUser, testServer, 100)
    expect(newRank.xp).toBe(100)
    const newRank2 = await client.setXp(testUser, testServer, 150)
    expect(newRank2.xp).toBe(150)
})
