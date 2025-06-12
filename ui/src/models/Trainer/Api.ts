import type {
	TrainerModel,
	TrainerStorePayload,
	TrainerUpdatePayload,
} from '@/models/Trainer/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TrainersApi extends Api<
	TrainerModel,
	LaravelPaginationResponse<TrainerModel>,
	TrainerStorePayload,
	TrainerUpdatePayload
> {
	route = 'trainers'
}
