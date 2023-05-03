import { beforeEach, expect, test, vi } from "vitest"
import { ExperimentManager } from "../src"

import { prismaMock } from "./prismaMock"

const data = [
	{
		name: "test1",
		feature_key: "test1",
		rollout_percentage: 100,
	},
	{
		name: "test2",
		feature_key: "test2",
		rollout_percentage: 0,
	},
]

test("The manager should have initalized properly", () => {
	prismaMock.experiment.findMany.mockResolvedValue(data)

	const manager = new ExperimentManager({ prisma: prismaMock })
	expect(manager).toBeInstanceOf(ExperimentManager)

	expect(manager.experiments[0].name).toBe(data[0].name)

	console.log(manager)
})
