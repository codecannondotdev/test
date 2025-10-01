import type { DICOMInstanceModel } from '@/models/DICOMInstance/Model'
import DICOMInstancesApi from '@/models/DICOMInstance/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DICOMInstanceDetailsState extends DetailsState<DICOMInstancesApi, DICOMInstanceModel> {
	api = new DICOMInstancesApi()
}

export function useDICOMInstanceDetailsState() {
	return new DICOMInstanceDetailsState()
}

export class DICOMInstanceListState extends ListState<
	DICOMInstancesApi,
	DICOMInstanceModel,
	LaravelPaginationResponse<DICOMInstanceModel>
> {
	api = new DICOMInstancesApi()
}

export function useDICOMInstanceListState() {
	return new DICOMInstanceListState()
}
