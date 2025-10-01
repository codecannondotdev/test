import type {
	LeaveRequestModel,
	LeaveRequestStorePayload,
	LeaveRequestUpdatePayload,
} from '@/models/LeaveRequest/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class LeaveRequestsApi extends Api<
	LeaveRequestModel,
	LaravelPaginationResponse<LeaveRequestModel>,
	LeaveRequestStorePayload,
	LeaveRequestUpdatePayload
> {
	route = 'leave-requests'
}
