import { experimentData } from "."
import Experiment from "./Experiment"

export class ExperimentManager {
	experiments: Experiment[]
	constructor(rawExperiments: experimentData[]) {
		this.experiments = []

		this.loadExperiments(rawExperiments)
	}

	checkExperimentAccess(featureKey: string, guildId: string) {
		const experiment = this.getExperimentByKey(featureKey)
		if (!experiment) return false
		return experiment.checkAccess(guildId)
	}

	getExperimentByHash(id: number) {
		return this.experiments.find((e) => e.id === id)
	}

	getExperimentByKey(key: string) {
		return this.experiments.find((e) => e.featureKey === key)
	}

	private loadExperiments(rawExperiments: experimentData[]) {
		for (const experimental of rawExperiments) {
			this.experiments.push(new Experiment(experimental))
		}
	}
}
