import type { WardModel } from '@/models/Ward/Model'
import WardsApi from '@/models/Ward/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class WardDetailsState extends DetailsState<WardsApi, WardModel> {
	api = new WardsApi()
}

export function useWardDetailsState() {
	return new WardDetailsState()
}

export class WardListState extends ListState<
	WardsApi,
	WardModel,
	LaravelPaginationResponse<WardModel>
> {
	api = new WardsApi()
}

export function useWardListState() {
	return new WardListState()
}
