import type {
	PurchaseOrderModel,
	PurchaseOrderStorePayload,
	PurchaseOrderUpdatePayload,
} from '@/models/PurchaseOrder/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PurchaseOrdersApi extends Api<
	PurchaseOrderModel,
	LaravelPaginationResponse<PurchaseOrderModel>,
	PurchaseOrderStorePayload,
	PurchaseOrderUpdatePayload
> {
	route = 'purchase-orders'
}
