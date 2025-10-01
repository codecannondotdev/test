import type { HomeCareVisitModel } from '@/models/HomeCareVisit/Model'
import HomeCareVisitsApi from '@/models/HomeCareVisit/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class HomeCareVisitDetailsState extends DetailsState<HomeCareVisitsApi, HomeCareVisitModel> {
	api = new HomeCareVisitsApi()
}

export function useHomeCareVisitDetailsState() {
	return new HomeCareVisitDetailsState()
}

export class HomeCareVisitListState extends ListState<
	HomeCareVisitsApi,
	HomeCareVisitModel,
	LaravelPaginationResponse<HomeCareVisitModel>
> {
	api = new HomeCareVisitsApi()
}

export function useHomeCareVisitListState() {
	return new HomeCareVisitListState()
}
