import type { SubscriptionModel } from '@/models/Subscription/Model'
import SubscriptionsApi from '@/models/Subscription/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SubscriptionDetailsState extends DetailsState<SubscriptionsApi, SubscriptionModel> {
	api = new SubscriptionsApi()
}

export function useSubscriptionDetailsState() {
	return new SubscriptionDetailsState()
}

export class SubscriptionListState extends ListState<
	SubscriptionsApi,
	SubscriptionModel,
	LaravelPaginationResponse<SubscriptionModel>
> {
	api = new SubscriptionsApi()
}

export function useSubscriptionListState() {
	return new SubscriptionListState()
}
