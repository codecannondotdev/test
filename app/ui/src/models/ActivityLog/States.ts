import type { ActivityLogModel } from '@/models/ActivityLog/Model'
import ActivityLogsApi from '@/models/ActivityLog/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ActivityLogDetailsState extends DetailsState<ActivityLogsApi, ActivityLogModel> {
	api = new ActivityLogsApi()
}

export function useActivityLogDetailsState() {
	return new ActivityLogDetailsState()
}

export class ActivityLogListState extends ListState<
	ActivityLogsApi,
	ActivityLogModel,
	LaravelPaginationResponse<ActivityLogModel>
> {
	api = new ActivityLogsApi()
}

export function useActivityLogListState() {
	return new ActivityLogListState()
}
