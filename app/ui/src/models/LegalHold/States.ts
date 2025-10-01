import type { LegalHoldModel } from '@/models/LegalHold/Model'
import LegalHoldsApi from '@/models/LegalHold/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class LegalHoldDetailsState extends DetailsState<LegalHoldsApi, LegalHoldModel> {
	api = new LegalHoldsApi()
}

export function useLegalHoldDetailsState() {
	return new LegalHoldDetailsState()
}

export class LegalHoldListState extends ListState<
	LegalHoldsApi,
	LegalHoldModel,
	LaravelPaginationResponse<LegalHoldModel>
> {
	api = new LegalHoldsApi()
}

export function useLegalHoldListState() {
	return new LegalHoldListState()
}
