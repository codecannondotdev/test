import type { NutritionalPlanModel } from '@/models/NutritionalPlan/Model'
import NutritionalPlansApi from '@/models/NutritionalPlan/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class NutritionalPlanDetailsState extends DetailsState<
	NutritionalPlansApi,
	NutritionalPlanModel
> {
	api = new NutritionalPlansApi()
}

export function useNutritionalPlanDetailsState() {
	return new NutritionalPlanDetailsState()
}

export class NutritionalPlanListState extends ListState<
	NutritionalPlansApi,
	NutritionalPlanModel,
	LaravelPaginationResponse<NutritionalPlanModel>
> {
	api = new NutritionalPlansApi()
}

export function useNutritionalPlanListState() {
	return new NutritionalPlanListState()
}
