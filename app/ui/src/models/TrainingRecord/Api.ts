import type {
	TrainingRecordModel,
	TrainingRecordStorePayload,
	TrainingRecordUpdatePayload,
} from '@/models/TrainingRecord/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TrainingRecordsApi extends Api<
	TrainingRecordModel,
	LaravelPaginationResponse<TrainingRecordModel>,
	TrainingRecordStorePayload,
	TrainingRecordUpdatePayload
> {
	route = 'training-records'
}
