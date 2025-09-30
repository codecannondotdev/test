import type {
	MembershipModel,
	MembershipStorePayload,
	MembershipUpdatePayload,
} from '@/models/Membership/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MembershipsApi extends Api<
	MembershipModel,
	LaravelPaginationResponse<MembershipModel>,
	MembershipStorePayload,
	MembershipUpdatePayload
> {
	route = 'memberships'
}
