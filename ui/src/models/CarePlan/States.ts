import type { CarePlanModel } from '@/models/CarePlan/Model'
import CarePlansApi from '@/models/CarePlan/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CarePlanDetailsState extends DetailsState<CarePlansApi, CarePlanModel> {
	api = new CarePlansApi()
}

export function useCarePlanDetailsState() {
	return new CarePlanDetailsState()
}

export class CarePlanListState extends ListState<
	CarePlansApi,
	CarePlanModel,
	LaravelPaginationResponse<CarePlanModel>
> {
	api = new CarePlansApi()
}

export function useCarePlanListState() {
	return new CarePlanListState()
}
