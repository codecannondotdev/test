import type { HospiceCareModel } from '@/models/HospiceCare/Model'
import HospiceCaresApi from '@/models/HospiceCare/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class HospiceCareDetailsState extends DetailsState<HospiceCaresApi, HospiceCareModel> {
	api = new HospiceCaresApi()
}

export function useHospiceCareDetailsState() {
	return new HospiceCareDetailsState()
}

export class HospiceCareListState extends ListState<
	HospiceCaresApi,
	HospiceCareModel,
	LaravelPaginationResponse<HospiceCareModel>
> {
	api = new HospiceCaresApi()
}

export function useHospiceCareListState() {
	return new HospiceCareListState()
}
