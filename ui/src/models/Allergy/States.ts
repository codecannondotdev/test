import type { AllergyModel } from '@/models/Allergy/Model'
import AllergysApi from '@/models/Allergy/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AllergyDetailsState extends DetailsState<AllergysApi, AllergyModel> {
	api = new AllergysApi()
}

export function useAllergyDetailsState() {
	return new AllergyDetailsState()
}

export class AllergyListState extends ListState<
	AllergysApi,
	AllergyModel,
	LaravelPaginationResponse<AllergyModel>
> {
	api = new AllergysApi()
}

export function useAllergyListState() {
	return new AllergyListState()
}
