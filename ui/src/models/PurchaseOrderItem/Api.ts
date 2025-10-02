import type {
	PurchaseOrderItemModel,
	PurchaseOrderItemStorePayload,
	PurchaseOrderItemUpdatePayload,
} from '@/models/PurchaseOrderItem/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PurchaseOrderItemsApi extends Api<
	PurchaseOrderItemModel,
	LaravelPaginationResponse<PurchaseOrderItemModel>,
	PurchaseOrderItemStorePayload,
	PurchaseOrderItemUpdatePayload
> {
	route = 'purchase-order-items'
}
