import type { AdmissionModel } from '@/models/Admission/Model'
import AdmissionsApi from '@/models/Admission/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AdmissionDetailsState extends DetailsState<AdmissionsApi, AdmissionModel> {
	api = new AdmissionsApi()
}

export function useAdmissionDetailsState() {
	return new AdmissionDetailsState()
}

export class AdmissionListState extends ListState<
	AdmissionsApi,
	AdmissionModel,
	LaravelPaginationResponse<AdmissionModel>
> {
	api = new AdmissionsApi()
}

export function useAdmissionListState() {
	return new AdmissionListState()
}
