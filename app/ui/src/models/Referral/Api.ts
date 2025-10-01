import type {
	ReferralModel,
	ReferralStorePayload,
	ReferralUpdatePayload,
} from '@/models/Referral/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ReferralsApi extends Api<
	ReferralModel,
	LaravelPaginationResponse<ReferralModel>,
	ReferralStorePayload,
	ReferralUpdatePayload
> {
	route = 'referrals'
}
