import type {
	FeedbackModel,
	FeedbackStorePayload,
	FeedbackUpdatePayload,
} from '@/models/Feedback/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class FeedbacksApi extends Api<
	FeedbackModel,
	LaravelPaginationResponse<FeedbackModel>,
	FeedbackStorePayload,
	FeedbackUpdatePayload
> {
	route = 'feedbacks'
}
