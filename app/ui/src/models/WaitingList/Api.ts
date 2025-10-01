import type {
	WaitingListModel,
	WaitingListStorePayload,
	WaitingListUpdatePayload,
} from '@/models/WaitingList/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class WaitingListsApi extends Api<
	WaitingListModel,
	LaravelPaginationResponse<WaitingListModel>,
	WaitingListStorePayload,
	WaitingListUpdatePayload
> {
	route = 'waiting-lists'
}
