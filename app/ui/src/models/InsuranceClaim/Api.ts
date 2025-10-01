import type {
	InsuranceClaimModel,
	InsuranceClaimStorePayload,
	InsuranceClaimUpdatePayload,
} from '@/models/InsuranceClaim/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class InsuranceClaimsApi extends Api<
	InsuranceClaimModel,
	LaravelPaginationResponse<InsuranceClaimModel>,
	InsuranceClaimStorePayload,
	InsuranceClaimUpdatePayload
> {
	route = 'insurance-claims'
}
