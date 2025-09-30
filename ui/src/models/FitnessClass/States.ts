import type { FitnessClassModel } from '@/models/FitnessClass/Model'
import FitnessClasssApi from '@/models/FitnessClass/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class FitnessClassDetailsState extends DetailsState<FitnessClasssApi, FitnessClassModel> {
	api = new FitnessClasssApi()
}

export function useFitnessClassDetailsState() {
	return new FitnessClassDetailsState()
}

export class FitnessClassListState extends ListState<
	FitnessClasssApi,
	FitnessClassModel,
	LaravelPaginationResponse<FitnessClassModel>
> {
	api = new FitnessClasssApi()
}

export function useFitnessClassListState() {
	return new FitnessClassListState()
}
