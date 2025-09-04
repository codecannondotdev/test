import type { MemberModel, MemberStorePayload, MemberUpdatePayload } from '@/models/Member/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MembersApi extends Api<
	MemberModel,
	LaravelPaginationResponse<MemberModel>,
	MemberStorePayload,
	MemberUpdatePayload
> {
	route = 'members'
}
