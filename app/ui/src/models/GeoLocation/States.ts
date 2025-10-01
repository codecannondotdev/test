import type { GeoLocationModel } from '@/models/GeoLocation/Model'
import GeoLocationsApi from '@/models/GeoLocation/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class GeoLocationDetailsState extends DetailsState<GeoLocationsApi, GeoLocationModel> {
	api = new GeoLocationsApi()
}

export function useGeoLocationDetailsState() {
	return new GeoLocationDetailsState()
}

export class GeoLocationListState extends ListState<
	GeoLocationsApi,
	GeoLocationModel,
	LaravelPaginationResponse<GeoLocationModel>
> {
	api = new GeoLocationsApi()
}

export function useGeoLocationListState() {
	return new GeoLocationListState()
}
