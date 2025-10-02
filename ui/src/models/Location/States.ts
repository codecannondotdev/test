import type { LocationModel } from '@/models/Location/Model'
import LocationsApi from '@/models/Location/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class LocationDetailsState extends DetailsState<LocationsApi, LocationModel> {
	api = new LocationsApi()
}

export function useLocationDetailsState() {
	return new LocationDetailsState()
}

export class LocationListState extends ListState<
	LocationsApi,
	LocationModel,
	LaravelPaginationResponse<LocationModel>
> {
	api = new LocationsApi()
}

export function useLocationListState() {
	return new LocationListState()
}
