import type {
	BillingItemModel,
	BillingItemStorePayload,
	BillingItemUpdatePayload,
} from '@/models/BillingItem/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BillingItemsApi extends Api<
	BillingItemModel,
	LaravelPaginationResponse<BillingItemModel>,
	BillingItemStorePayload,
	BillingItemUpdatePayload
> {
	route = 'billing-items'
}
