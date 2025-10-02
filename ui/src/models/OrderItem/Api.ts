import type {
	OrderItemModel,
	OrderItemStorePayload,
	OrderItemUpdatePayload,
} from '@/models/OrderItem/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class OrderItemsApi extends Api<
	OrderItemModel,
	LaravelPaginationResponse<OrderItemModel>,
	OrderItemStorePayload,
	OrderItemUpdatePayload
> {
	route = 'order-items'
}
