import type { HL7MessageModel } from '@/models/HL7Message/Model'
import HL7MessagesApi from '@/models/HL7Message/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class HL7MessageDetailsState extends DetailsState<HL7MessagesApi, HL7MessageModel> {
	api = new HL7MessagesApi()
}

export function useHL7MessageDetailsState() {
	return new HL7MessageDetailsState()
}

export class HL7MessageListState extends ListState<
	HL7MessagesApi,
	HL7MessageModel,
	LaravelPaginationResponse<HL7MessageModel>
> {
	api = new HL7MessagesApi()
}

export function useHL7MessageListState() {
	return new HL7MessageListState()
}
