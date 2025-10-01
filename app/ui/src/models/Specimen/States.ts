import type { SpecimenModel } from '@/models/Specimen/Model'
import SpecimensApi from '@/models/Specimen/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SpecimenDetailsState extends DetailsState<SpecimensApi, SpecimenModel> {
	api = new SpecimensApi()
}

export function useSpecimenDetailsState() {
	return new SpecimenDetailsState()
}

export class SpecimenListState extends ListState<
	SpecimensApi,
	SpecimenModel,
	LaravelPaginationResponse<SpecimenModel>
> {
	api = new SpecimensApi()
}

export function useSpecimenListState() {
	return new SpecimenListState()
}
