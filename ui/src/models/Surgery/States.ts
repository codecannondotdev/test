import type { SurgeryModel } from '@/models/Surgery/Model'
import SurgerysApi from '@/models/Surgery/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SurgeryDetailsState extends DetailsState<SurgerysApi, SurgeryModel> {
	api = new SurgerysApi()
}

export function useSurgeryDetailsState() {
	return new SurgeryDetailsState()
}

export class SurgeryListState extends ListState<
	SurgerysApi,
	SurgeryModel,
	LaravelPaginationResponse<SurgeryModel>
> {
	api = new SurgerysApi()
}

export function useSurgeryListState() {
	return new SurgeryListState()
}
