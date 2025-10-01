import type { QueueModel, QueueStorePayload, QueueUpdatePayload } from '@/models/Queue/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class QueuesApi extends Api<
	QueueModel,
	LaravelPaginationResponse<QueueModel>,
	QueueStorePayload,
	QueueUpdatePayload
> {
	route = 'queues'
}
