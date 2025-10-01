import type { FollowUpModel } from '@/models/FollowUp/Model'
import FollowUpsApi from '@/models/FollowUp/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class FollowUpDetailsState extends DetailsState<FollowUpsApi, FollowUpModel> {
	api = new FollowUpsApi()
}

export function useFollowUpDetailsState() {
	return new FollowUpDetailsState()
}

export class FollowUpListState extends ListState<
	FollowUpsApi,
	FollowUpModel,
	LaravelPaginationResponse<FollowUpModel>
> {
	api = new FollowUpsApi()
}

export function useFollowUpListState() {
	return new FollowUpListState()
}
