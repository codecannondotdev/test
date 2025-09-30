import type { AsdfasdfasdModel } from '@/models/Asdfasdfasd/Model'
import AsdfasdfasdsApi from '@/models/Asdfasdfasd/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AsdfasdfasdDetailsState extends DetailsState<AsdfasdfasdsApi, AsdfasdfasdModel> {
	api = new AsdfasdfasdsApi()
}

export function useAsdfasdfasdDetailsState() {
	return new AsdfasdfasdDetailsState()
}

export class AsdfasdfasdListState extends ListState<
	AsdfasdfasdsApi,
	AsdfasdfasdModel,
	LaravelPaginationResponse<AsdfasdfasdModel>
> {
	api = new AsdfasdfasdsApi()
}

export function useAsdfasdfasdListState() {
	return new AsdfasdfasdListState()
}
