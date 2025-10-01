import type { ShiftAssignmentModel } from '@/models/ShiftAssignment/Model'
import ShiftAssignmentsApi from '@/models/ShiftAssignment/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ShiftAssignmentDetailsState extends DetailsState<
	ShiftAssignmentsApi,
	ShiftAssignmentModel
> {
	api = new ShiftAssignmentsApi()
}

export function useShiftAssignmentDetailsState() {
	return new ShiftAssignmentDetailsState()
}

export class ShiftAssignmentListState extends ListState<
	ShiftAssignmentsApi,
	ShiftAssignmentModel,
	LaravelPaginationResponse<ShiftAssignmentModel>
> {
	api = new ShiftAssignmentsApi()
}

export function useShiftAssignmentListState() {
	return new ShiftAssignmentListState()
}
