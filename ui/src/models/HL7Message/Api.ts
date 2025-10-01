import type {
	HL7MessageModel,
	HL7MessageStorePayload,
	HL7MessageUpdatePayload,
} from '@/models/HL7Message/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class HL7MessagesApi extends Api<
	HL7MessageModel,
	LaravelPaginationResponse<HL7MessageModel>,
	HL7MessageStorePayload,
	HL7MessageUpdatePayload
> {
	route = 'hl7-messages'
}
