import type { ReturnModelModel } from '@/models/ReturnModel/Model'
import ReturnModelsApi from '@/models/ReturnModel/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ReturnModelDetailsState extends DetailsState<ReturnModelsApi, ReturnModelModel> {
	api = new ReturnModelsApi()
}

export function useReturnModelDetailsState() {
	return new ReturnModelDetailsState()
}

export class ReturnModelListState extends ListState<
	ReturnModelsApi,
	ReturnModelModel,
	LaravelPaginationResponse<ReturnModelModel>
> {
	api = new ReturnModelsApi()
}

export function useReturnModelListState() {
	return new ReturnModelListState()
}
