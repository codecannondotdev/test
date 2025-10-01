import type { WaitingListModel } from '@/models/WaitingList/Model'
import WaitingListsApi from '@/models/WaitingList/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class WaitingListDetailsState extends DetailsState<WaitingListsApi, WaitingListModel> {
	api = new WaitingListsApi()
}

export function useWaitingListDetailsState() {
	return new WaitingListDetailsState()
}

export class WaitingListListState extends ListState<
	WaitingListsApi,
	WaitingListModel,
	LaravelPaginationResponse<WaitingListModel>
> {
	api = new WaitingListsApi()
}

export function useWaitingListListState() {
	return new WaitingListListState()
}
