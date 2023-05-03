import { PrismaClient } from "@prisma/client"
import { beforeEach, vi } from "vitest"
import { mockDeep, mockReset, DeepMockProxy } from "vitest-mock-extended"

import prisma from "./client"

vi.mock("./client", () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
	mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
