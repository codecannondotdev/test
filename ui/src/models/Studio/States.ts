import type { StudioModel } from '@/models/Studio/Model'
import StudiosApi from '@/models/Studio/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class StudioDetailsState extends DetailsState<StudiosApi, StudioModel> {
	api = new StudiosApi()
}

export function useStudioDetailsState() {
	return new StudioDetailsState()
}

export class StudioListState extends ListState<
	StudiosApi,
	StudioModel,
	LaravelPaginationResponse<StudioModel>
> {
	api = new StudiosApi()
}

export function useStudioListState() {
	return new StudioListState()
}
