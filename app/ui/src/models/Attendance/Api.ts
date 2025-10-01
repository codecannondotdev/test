import type {
	AttendanceModel,
	AttendanceStorePayload,
	AttendanceUpdatePayload,
} from '@/models/Attendance/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AttendancesApi extends Api<
	AttendanceModel,
	LaravelPaginationResponse<AttendanceModel>,
	AttendanceStorePayload,
	AttendanceUpdatePayload
> {
	route = 'attendances'
}
