import { experimentData } from "."
import Experiment from "./Experiment"
import { PrismaClient } from "@prisma/client"

export type ExperimentManagerOptions =
	| {
			rawExperiments: experimentData[]
	  }
	| {
			prisma: PrismaClient
	  }

export class ExperimentManager {
	experiments: Experiment[]
	constructor(options: ExperimentManagerOptions) {
		this.experiments = []

		if ("rawExperiments" in options) {
			this.loadExperimentsFromArray(options.rawExperiments)
		} else if ("prisma" in options) {
			;(async () => {
				await this.loadExperimentsFromPrisma(options.prisma)
			})()
		}
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

	private loadExperimentsFromArray(rawExperiments: experimentData[]) {
		for (const experimental of rawExperiments) {
			this.experiments.push(new Experiment(experimental))
		}
	}

	private async loadExperimentsFromPrisma(prisma: PrismaClient) {
		const experiments = await prisma.experiment.findMany()
		console.log(experiments)
		if (!experiments) return
        for await (const experiment of experiments) {
            this.experiments.push(new Experiment(experiment))
        }
	}
}
