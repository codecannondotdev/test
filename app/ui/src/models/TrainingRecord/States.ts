import type { TrainingRecordModel } from '@/models/TrainingRecord/Model'
import TrainingRecordsApi from '@/models/TrainingRecord/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TrainingRecordDetailsState extends DetailsState<
	TrainingRecordsApi,
	TrainingRecordModel
> {
	api = new TrainingRecordsApi()
}

export function useTrainingRecordDetailsState() {
	return new TrainingRecordDetailsState()
}

export class TrainingRecordListState extends ListState<
	TrainingRecordsApi,
	TrainingRecordModel,
	LaravelPaginationResponse<TrainingRecordModel>
> {
	api = new TrainingRecordsApi()
}

export function useTrainingRecordListState() {
	return new TrainingRecordListState()
}
