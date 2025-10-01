import type { ScreeningModel } from '@/models/Screening/Model'
import ScreeningsApi from '@/models/Screening/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ScreeningDetailsState extends DetailsState<ScreeningsApi, ScreeningModel> {
	api = new ScreeningsApi()
}

export function useScreeningDetailsState() {
	return new ScreeningDetailsState()
}

export class ScreeningListState extends ListState<
	ScreeningsApi,
	ScreeningModel,
	LaravelPaginationResponse<ScreeningModel>
> {
	api = new ScreeningsApi()
}

export function useScreeningListState() {
	return new ScreeningListState()
}
