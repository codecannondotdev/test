import type {
	ScheduleModel,
	ScheduleStorePayload,
	ScheduleUpdatePayload,
} from '@/models/Schedule/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SchedulesApi extends Api<
	ScheduleModel,
	LaravelPaginationResponse<ScheduleModel>,
	ScheduleStorePayload,
	ScheduleUpdatePayload
> {
	route = 'schedules'
}
