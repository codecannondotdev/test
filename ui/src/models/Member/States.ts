import type { MemberModel } from '@/models/Member/Model'
import MembersApi from '@/models/Member/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MemberDetailsState extends DetailsState<MembersApi, MemberModel> {
	api = new MembersApi()
}

export function useMemberDetailsState() {
	return new MemberDetailsState()
}

export class MemberListState extends ListState<
	MembersApi,
	MemberModel,
	LaravelPaginationResponse<MemberModel>
> {
	api = new MembersApi()
}

export function useMemberListState() {
	return new MemberListState()
}
