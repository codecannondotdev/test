import type {
	FitnessClassModel,
	FitnessClassStorePayload,
	FitnessClassUpdatePayload,
} from '@/models/FitnessClass/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class FitnessClasssApi extends Api<
	FitnessClassModel,
	LaravelPaginationResponse<FitnessClassModel>,
	FitnessClassStorePayload,
	FitnessClassUpdatePayload
> {
	route = 'fitness-classs'
}
