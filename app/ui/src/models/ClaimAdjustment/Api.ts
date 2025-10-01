import type {
	ClaimAdjustmentModel,
	ClaimAdjustmentStorePayload,
	ClaimAdjustmentUpdatePayload,
} from '@/models/ClaimAdjustment/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ClaimAdjustmentsApi extends Api<
	ClaimAdjustmentModel,
	LaravelPaginationResponse<ClaimAdjustmentModel>,
	ClaimAdjustmentStorePayload,
	ClaimAdjustmentUpdatePayload
> {
	route = 'claim-adjustments'
}
