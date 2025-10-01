import type { AttendanceModel } from '@/models/Attendance/Model'
import AttendancesApi from '@/models/Attendance/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AttendanceDetailsState extends DetailsState<AttendancesApi, AttendanceModel> {
	api = new AttendancesApi()
}

export function useAttendanceDetailsState() {
	return new AttendanceDetailsState()
}

export class AttendanceListState extends ListState<
	AttendancesApi,
	AttendanceModel,
	LaravelPaginationResponse<AttendanceModel>
> {
	api = new AttendancesApi()
}

export function useAttendanceListState() {
	return new AttendanceListState()
}
