import type {
	ActivityLogModel,
	ActivityLogStorePayload,
	ActivityLogUpdatePayload,
} from '@/models/ActivityLog/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ActivityLogsApi extends Api<
	ActivityLogModel,
	LaravelPaginationResponse<ActivityLogModel>,
	ActivityLogStorePayload,
	ActivityLogUpdatePayload
> {
	route = 'activity-logs'
}
