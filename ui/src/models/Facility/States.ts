import type { FacilityModel } from '@/models/Facility/Model'
import FacilitysApi from '@/models/Facility/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class FacilityDetailsState extends DetailsState<FacilitysApi, FacilityModel> {
	api = new FacilitysApi()
}

export function useFacilityDetailsState() {
	return new FacilityDetailsState()
}

export class FacilityListState extends ListState<
	FacilitysApi,
	FacilityModel,
	LaravelPaginationResponse<FacilityModel>
> {
	api = new FacilitysApi()
}

export function useFacilityListState() {
	return new FacilityListState()
}
