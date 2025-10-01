import type { PalliativeCarePlanModel } from '@/models/PalliativeCarePlan/Model'
import PalliativeCarePlansApi from '@/models/PalliativeCarePlan/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PalliativeCarePlanDetailsState extends DetailsState<
	PalliativeCarePlansApi,
	PalliativeCarePlanModel
> {
	api = new PalliativeCarePlansApi()
}

export function usePalliativeCarePlanDetailsState() {
	return new PalliativeCarePlanDetailsState()
}

export class PalliativeCarePlanListState extends ListState<
	PalliativeCarePlansApi,
	PalliativeCarePlanModel,
	LaravelPaginationResponse<PalliativeCarePlanModel>
> {
	api = new PalliativeCarePlansApi()
}

export function usePalliativeCarePlanListState() {
	return new PalliativeCarePlanListState()
}
