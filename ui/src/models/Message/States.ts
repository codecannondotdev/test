import type { MessageModel } from '@/models/Message/Model'
import MessagesApi from '@/models/Message/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MessageDetailsState extends DetailsState<MessagesApi, MessageModel> {
	api = new MessagesApi()
}

export function useMessageDetailsState() {
	return new MessageDetailsState()
}

export class MessageListState extends ListState<
	MessagesApi,
	MessageModel,
	LaravelPaginationResponse<MessageModel>
> {
	api = new MessagesApi()
}

export function useMessageListState() {
	return new MessageListState()
}
