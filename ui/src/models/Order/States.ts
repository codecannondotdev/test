import type { OrderModel } from '@/models/Order/Model'
import OrdersApi from '@/models/Order/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class OrderDetailsState extends DetailsState<OrdersApi, OrderModel> {
	api = new OrdersApi()
}

export function useOrderDetailsState() {
	return new OrderDetailsState()
}

export class OrderListState extends ListState<
	OrdersApi,
	OrderModel,
	LaravelPaginationResponse<OrderModel>
> {
	api = new OrdersApi()
}

export function useOrderListState() {
	return new OrderListState()
}
