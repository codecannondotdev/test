import type { LeaveRequestModel } from '@/models/LeaveRequest/Model'
import LeaveRequestsApi from '@/models/LeaveRequest/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class LeaveRequestDetailsState extends DetailsState<LeaveRequestsApi, LeaveRequestModel> {
	api = new LeaveRequestsApi()
}

export function useLeaveRequestDetailsState() {
	return new LeaveRequestDetailsState()
}

export class LeaveRequestListState extends ListState<
	LeaveRequestsApi,
	LeaveRequestModel,
	LaravelPaginationResponse<LeaveRequestModel>
> {
	api = new LeaveRequestsApi()
}

export function useLeaveRequestListState() {
	return new LeaveRequestListState()
}
