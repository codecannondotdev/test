import type {
	ShiftAssignmentModel,
	ShiftAssignmentStorePayload,
	ShiftAssignmentUpdatePayload,
} from '@/models/ShiftAssignment/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ShiftAssignmentsApi extends Api<
	ShiftAssignmentModel,
	LaravelPaginationResponse<ShiftAssignmentModel>,
	ShiftAssignmentStorePayload,
	ShiftAssignmentUpdatePayload
> {
	route = 'shift-assignments'
}
