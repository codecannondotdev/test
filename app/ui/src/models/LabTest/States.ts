import type { LabTestModel } from '@/models/LabTest/Model'
import LabTestsApi from '@/models/LabTest/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class LabTestDetailsState extends DetailsState<LabTestsApi, LabTestModel> {
	api = new LabTestsApi()
}

export function useLabTestDetailsState() {
	return new LabTestDetailsState()
}

export class LabTestListState extends ListState<
	LabTestsApi,
	LabTestModel,
	LaravelPaginationResponse<LabTestModel>
> {
	api = new LabTestsApi()
}

export function useLabTestListState() {
	return new LabTestListState()
}
