import type { BedModel } from '@/models/Bed/Model'
import BedsApi from '@/models/Bed/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BedDetailsState extends DetailsState<BedsApi, BedModel> {
	api = new BedsApi()
}

export function useBedDetailsState() {
	return new BedDetailsState()
}

export class BedListState extends ListState<
	BedsApi,
	BedModel,
	LaravelPaginationResponse<BedModel>
> {
	api = new BedsApi()
}

export function useBedListState() {
	return new BedListState()
}
