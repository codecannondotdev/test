import type { FactoryModel } from '@/models/Factory/Model'
import FactorysApi from '@/models/Factory/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class FactoryDetailsState extends DetailsState<FactorysApi, FactoryModel> {
	api = new FactorysApi()
}

export function useFactoryDetailsState() {
	return new FactoryDetailsState()
}

export class FactoryListState extends ListState<
	FactorysApi,
	FactoryModel,
	LaravelPaginationResponse<FactoryModel>
> {
	api = new FactorysApi()
}

export function useFactoryListState() {
	return new FactoryListState()
}
