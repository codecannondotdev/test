import type { APIKeyModel } from '@/models/APIKey/Model'
import APIKeysApi from '@/models/APIKey/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class APIKeyDetailsState extends DetailsState<APIKeysApi, APIKeyModel> {
	api = new APIKeysApi()
}

export function useAPIKeyDetailsState() {
	return new APIKeyDetailsState()
}

export class APIKeyListState extends ListState<
	APIKeysApi,
	APIKeyModel,
	LaravelPaginationResponse<APIKeyModel>
> {
	api = new APIKeysApi()
}

export function useAPIKeyListState() {
	return new APIKeyListState()
}
