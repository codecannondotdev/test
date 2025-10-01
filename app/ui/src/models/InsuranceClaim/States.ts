import type { InsuranceClaimModel } from '@/models/InsuranceClaim/Model'
import InsuranceClaimsApi from '@/models/InsuranceClaim/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class InsuranceClaimDetailsState extends DetailsState<
	InsuranceClaimsApi,
	InsuranceClaimModel
> {
	api = new InsuranceClaimsApi()
}

export function useInsuranceClaimDetailsState() {
	return new InsuranceClaimDetailsState()
}

export class InsuranceClaimListState extends ListState<
	InsuranceClaimsApi,
	InsuranceClaimModel,
	LaravelPaginationResponse<InsuranceClaimModel>
> {
	api = new InsuranceClaimsApi()
}

export function useInsuranceClaimListState() {
	return new InsuranceClaimListState()
}
