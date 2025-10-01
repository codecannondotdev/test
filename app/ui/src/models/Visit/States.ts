import type { VisitModel } from '@/models/Visit/Model'
import VisitsApi from '@/models/Visit/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class VisitDetailsState extends DetailsState<VisitsApi, VisitModel> {
	api = new VisitsApi()
}

export function useVisitDetailsState() {
	return new VisitDetailsState()
}

export class VisitListState extends ListState<
	VisitsApi,
	VisitModel,
	LaravelPaginationResponse<VisitModel>
> {
	api = new VisitsApi()
}

export function useVisitListState() {
	return new VisitListState()
}
