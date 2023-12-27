import { expect, test } from "vitest"
import { ExperimentManager, experimentData } from "../src/index"

const data: experimentData[] = [
	{
		name: "Feature 1",
		feature_key: "featureOne",
		rollout_percentage: 50
	},
	{
		name: "Unreleased Feature",
		feature_key: "unreleased",
		rollout_percentage: 0,
		force_enabled: ["744282929684938844"]
	},
	{
		name: "Released Feature 2",
		feature_key: "featureTwo",
		rollout_percentage: 100,
		force_disabled: ["608098293498511360"]
	}
]

const manager = new ExperimentManager(data)

test("The manager should have initalized properly", () => {
	expect(manager).toBeInstanceOf(ExperimentManager)
	expect(manager.experiments[0].name).toBe(data[0].name)
})

test("The manager should grant access to a feature at 100%", async () => {
	const result = await manager.checkExperimentAccess(
		"featureTwo",
		"744282929684938844"
	)
	expect(result).toBe(true)
})

test("The manager should deny access to a feature at 0%", async () => {
	const result = await manager.checkExperimentAccess(
		"unreleased",
		"608098293498511360"
	)
	expect(result).toBe(false)
})

test("The manager should grant access to a feature at 0% but force enabled on a guild", async () => {
	const result = await manager.checkExperimentAccess(
		"unreleased",
		"744282929684938844"
	)
	expect(result).toBe(true)
})

test("The manager should deny access to a feature at 100% but force disabled on a guild", async () => {
	const result = await manager.checkExperimentAccess(
		"featureTwo",
		"608098293498511360"
	)
	expect(result).toBe(false)
})

test("The manager should grant access to a feature at 50% for a guild in the rollout based on the hash", async () => {
	const result = await manager.checkExperimentAccess(
		"featureOne",
		"744282929684938844"
	)
	expect(result).toBe(true)
})

test("The manager should deny access to a feature at 50% for a guild not in the rollout based on the hash", async () => {
	const result = await manager.checkExperimentAccess(
		"featureOne",
		"608098293498511360"
	)
	expect(result).toBe(false)
})
