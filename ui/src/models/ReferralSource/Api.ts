import type {
	ReferralSourceModel,
	ReferralSourceStorePayload,
	ReferralSourceUpdatePayload,
} from '@/models/ReferralSource/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ReferralSourcesApi extends Api<
	ReferralSourceModel,
	LaravelPaginationResponse<ReferralSourceModel>,
	ReferralSourceStorePayload,
	ReferralSourceUpdatePayload
> {
	route = 'referral-sources'
}
