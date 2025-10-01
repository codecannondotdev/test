import type { ImmunizationModel } from '@/models/Immunization/Model'
import ImmunizationsApi from '@/models/Immunization/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ImmunizationDetailsState extends DetailsState<ImmunizationsApi, ImmunizationModel> {
	api = new ImmunizationsApi()
}

export function useImmunizationDetailsState() {
	return new ImmunizationDetailsState()
}

export class ImmunizationListState extends ListState<
	ImmunizationsApi,
	ImmunizationModel,
	LaravelPaginationResponse<ImmunizationModel>
> {
	api = new ImmunizationsApi()
}

export function useImmunizationListState() {
	return new ImmunizationListState()
}
