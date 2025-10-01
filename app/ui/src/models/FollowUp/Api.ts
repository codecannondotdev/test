import type {
	FollowUpModel,
	FollowUpStorePayload,
	FollowUpUpdatePayload,
} from '@/models/FollowUp/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class FollowUpsApi extends Api<
	FollowUpModel,
	LaravelPaginationResponse<FollowUpModel>,
	FollowUpStorePayload,
	FollowUpUpdatePayload
> {
	route = 'follow-ups'
}
