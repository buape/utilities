export { ExperimentManager } from "./ExperimentManager"
export interface experimentData {
	name: string
	feature_key: string
	rollout_percentage: number
	force_enabled?: string[]
	force_disabled?: string[]
}
