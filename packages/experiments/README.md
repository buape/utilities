# @buape/experiments

This package is an experiment manager for use in creating limited rollouts of new features.

Each experiment has a unique rollout based on a hash created using the featureKey of the experiment and the guild ID.

## Installation

```bash
npm install @buape/experiments
```

## Usage

```js
import { ExperimentManager } from "@buape/experiments"
const data = [
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

await manager.checkExperimentAccess("unreleased", "1018194170906693653") // -> false, the percentage is at 0 and that guild is not force enabled
await manager.checkExperimentAccess("unreleased", "744282929684938844") // -> true, the guild is force enabled
```

## Planned Features

-   [ ] Add feature tags to guilds and filter experiments by tag instead of ID
-   [ ] Prisma integration (?)
-   [ ] Change rollouts on the fly instead of hardcoded
