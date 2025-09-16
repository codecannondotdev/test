import type { MembershipModel } from '@/models/Membership/Model'
import MembershipsApi from '@/models/Membership/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MembershipDetailsState extends DetailsState<MembershipsApi, MembershipModel> {
	api = new MembershipsApi()
}

export function useMembershipDetailsState() {
	return new MembershipDetailsState()
}

export class MembershipListState extends ListState<
	MembershipsApi,
	MembershipModel,
	LaravelPaginationResponse<MembershipModel>
> {
	api = new MembershipsApi()
}

export function useMembershipListState() {
	return new MembershipListState()
}
