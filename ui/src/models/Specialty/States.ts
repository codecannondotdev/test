import type { SpecialtyModel } from '@/models/Specialty/Model'
import SpecialtysApi from '@/models/Specialty/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SpecialtyDetailsState extends DetailsState<SpecialtysApi, SpecialtyModel> {
	api = new SpecialtysApi()
}

export function useSpecialtyDetailsState() {
	return new SpecialtyDetailsState()
}

export class SpecialtyListState extends ListState<
	SpecialtysApi,
	SpecialtyModel,
	LaravelPaginationResponse<SpecialtyModel>
> {
	api = new SpecialtysApi()
}

export function useSpecialtyListState() {
	return new SpecialtyListState()
}
