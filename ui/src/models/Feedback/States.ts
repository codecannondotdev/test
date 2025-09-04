import type { FeedbackModel } from '@/models/Feedback/Model'
import FeedbacksApi from '@/models/Feedback/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class FeedbackDetailsState extends DetailsState<FeedbacksApi, FeedbackModel> {
	api = new FeedbacksApi()
}

export function useFeedbackDetailsState() {
	return new FeedbackDetailsState()
}

export class FeedbackListState extends ListState<
	FeedbacksApi,
	FeedbackModel,
	LaravelPaginationResponse<FeedbackModel>
> {
	api = new FeedbacksApi()
}

export function useFeedbackListState() {
	return new FeedbackListState()
}
