import type { PredalModel } from '@/models/Predal/Model'
import PredalsApi from '@/models/Predal/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PredalDetailsState extends DetailsState<PredalsApi, PredalModel> {
	api = new PredalsApi()
}

export function usePredalDetailsState() {
	return new PredalDetailsState()
}

export class PredalListState extends ListState<
	PredalsApi,
	PredalModel,
	LaravelPaginationResponse<PredalModel>
> {
	api = new PredalsApi()
}

export function usePredalListState() {
	return new PredalListState()
}
