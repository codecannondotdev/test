import type { ScheduleModel } from '@/models/Schedule/Model'
import SchedulesApi from '@/models/Schedule/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ScheduleDetailsState extends DetailsState<SchedulesApi, ScheduleModel> {
	api = new SchedulesApi()
}

export function useScheduleDetailsState() {
	return new ScheduleDetailsState()
}

export class ScheduleListState extends ListState<
	SchedulesApi,
	ScheduleModel,
	LaravelPaginationResponse<ScheduleModel>
> {
	api = new SchedulesApi()
}

export function useScheduleListState() {
	return new ScheduleListState()
}
