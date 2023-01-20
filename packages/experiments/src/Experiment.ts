import { experimentData } from ".."
import murmurhash from "murmurhash"

export class Experiment {
    rawData: experimentData

    id: number
    name: string
    featureKey: string
    rolloutPercent: number
    settings: {
        forceEnabled: string[]
        forceDisabled: string[]
    }

    constructor(rawData: experimentData) {
        this.rawData = rawData
        this.name = rawData.name
        this.featureKey = rawData.feature_key

        this.settings = {
            forceEnabled: this.rawData.force_enabled || [],
            forceDisabled: this.rawData.force_disabled || [],
        }

        this.rolloutPercent = rawData.rollout_percentage > 100 ? 100 : rawData.rollout_percentage

        this.id = murmurhash.v3(this.featureKey)
    }

    async checkAccess(guildId: string) {
        if (this.settings.forceDisabled.includes(guildId)) return false
        if (this.settings.forceEnabled.includes(guildId)) return true

        if (this.rolloutPercent === 100) return true

        const hash = murmurhash.v3(`${this.featureKey}:${guildId}`) % 100

        return hash < this.rolloutPercent
    }
}

export default Experiment
