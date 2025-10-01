import type {
	MessageModel,
	MessageStorePayload,
	MessageUpdatePayload,
} from '@/models/Message/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MessagesApi extends Api<
	MessageModel,
	LaravelPaginationResponse<MessageModel>,
	MessageStorePayload,
	MessageUpdatePayload
> {
	route = 'messages'
}
