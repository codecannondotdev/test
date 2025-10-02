import type { OrderModel, OrderStorePayload, OrderUpdatePayload } from '@/models/Order/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class OrdersApi extends Api<
	OrderModel,
	LaravelPaginationResponse<OrderModel>,
	OrderStorePayload,
	OrderUpdatePayload
> {
	route = 'orders'
}
