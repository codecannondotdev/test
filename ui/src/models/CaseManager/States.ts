import type { CaseManagerModel } from '@/models/CaseManager/Model'
import CaseManagersApi from '@/models/CaseManager/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CaseManagerDetailsState extends DetailsState<CaseManagersApi, CaseManagerModel> {
	api = new CaseManagersApi()
}

export function useCaseManagerDetailsState() {
	return new CaseManagerDetailsState()
}

export class CaseManagerListState extends ListState<
	CaseManagersApi,
	CaseManagerModel,
	LaravelPaginationResponse<CaseManagerModel>
> {
	api = new CaseManagersApi()
}

export function useCaseManagerListState() {
	return new CaseManagerListState()
}
