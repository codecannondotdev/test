import type { InsuranceModel } from '@/models/Insurance/Model'
import InsurancesApi from '@/models/Insurance/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class InsuranceDetailsState extends DetailsState<InsurancesApi, InsuranceModel> {
	api = new InsurancesApi()
}

export function useInsuranceDetailsState() {
	return new InsuranceDetailsState()
}

export class InsuranceListState extends ListState<
	InsurancesApi,
	InsuranceModel,
	LaravelPaginationResponse<InsuranceModel>
> {
	api = new InsurancesApi()
}

export function useInsuranceListState() {
	return new InsuranceListState()
}
