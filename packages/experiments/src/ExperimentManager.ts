import { experimentData } from ".."
import Experiment from "./Experiment"

export default class ExperimentManager {
    experiments: Experiment[]
    constructor(rawExperiments: experimentData[]) {
        this.experiments = []

        this.loadExperiments(rawExperiments)
    }

    async checkExperimentAccess(featureKey: string, guildId: string) {
        const experiment = this.getExperimentByKey(featureKey)
        if (!experiment) return false // if that isn't an experiment, deny the feature to be safe
        // Disabled until database support is added
        // await db.guild.upsert({
        //     where: {
        //         id: guildId,
        //     },
        //     create: {
        //         id: guildId,
        //     },
        //     update: {},
        // })
        return experiment.checkAccess(guildId, [])
    }

    getExperimentByHash(id: string) {
        return this.experiments.find((e) => e.featureKey === id)
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
