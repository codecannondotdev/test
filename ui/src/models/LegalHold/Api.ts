import type {
	LegalHoldModel,
	LegalHoldStorePayload,
	LegalHoldUpdatePayload,
} from '@/models/LegalHold/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class LegalHoldsApi extends Api<
	LegalHoldModel,
	LaravelPaginationResponse<LegalHoldModel>,
	LegalHoldStorePayload,
	LegalHoldUpdatePayload
> {
	route = 'legal-holds'
}
