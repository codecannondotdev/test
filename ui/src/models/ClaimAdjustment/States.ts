import type { ClaimAdjustmentModel } from '@/models/ClaimAdjustment/Model'
import ClaimAdjustmentsApi from '@/models/ClaimAdjustment/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ClaimAdjustmentDetailsState extends DetailsState<
	ClaimAdjustmentsApi,
	ClaimAdjustmentModel
> {
	api = new ClaimAdjustmentsApi()
}

export function useClaimAdjustmentDetailsState() {
	return new ClaimAdjustmentDetailsState()
}

export class ClaimAdjustmentListState extends ListState<
	ClaimAdjustmentsApi,
	ClaimAdjustmentModel,
	LaravelPaginationResponse<ClaimAdjustmentModel>
> {
	api = new ClaimAdjustmentsApi()
}

export function useClaimAdjustmentListState() {
	return new ClaimAdjustmentListState()
}
