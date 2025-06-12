import type { TrainerModel } from '@/models/Trainer/Model'
import TrainersApi from '@/models/Trainer/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TrainerDetailsState extends DetailsState<TrainersApi, TrainerModel> {
	api = new TrainersApi()
}

export function useTrainerDetailsState() {
	return new TrainerDetailsState()
}

export class TrainerListState extends ListState<
	TrainersApi,
	TrainerModel,
	LaravelPaginationResponse<TrainerModel>
> {
	api = new TrainersApi()
}

export function useTrainerListState() {
	return new TrainerListState()
}
