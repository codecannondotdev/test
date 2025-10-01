import type { QueueModel } from '@/models/Queue/Model'
import QueuesApi from '@/models/Queue/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class QueueDetailsState extends DetailsState<QueuesApi, QueueModel> {
	api = new QueuesApi()
}

export function useQueueDetailsState() {
	return new QueueDetailsState()
}

export class QueueListState extends ListState<
	QueuesApi,
	QueueModel,
	LaravelPaginationResponse<QueueModel>
> {
	api = new QueuesApi()
}

export function useQueueListState() {
	return new QueueListState()
}
