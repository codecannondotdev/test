import type {
	SubscriptionModel,
	SubscriptionStorePayload,
	SubscriptionUpdatePayload,
} from '@/models/Subscription/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SubscriptionsApi extends Api<
	SubscriptionModel,
	LaravelPaginationResponse<SubscriptionModel>,
	SubscriptionStorePayload,
	SubscriptionUpdatePayload
> {
	route = 'subscriptions'
}
