import type { OrderItemModel } from '@/models/OrderItem/Model'
import OrderItemsApi from '@/models/OrderItem/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class OrderItemDetailsState extends DetailsState<OrderItemsApi, OrderItemModel> {
	api = new OrderItemsApi()
}

export function useOrderItemDetailsState() {
	return new OrderItemDetailsState()
}

export class OrderItemListState extends ListState<
	OrderItemsApi,
	OrderItemModel,
	LaravelPaginationResponse<OrderItemModel>
> {
	api = new OrderItemsApi()
}

export function useOrderItemListState() {
	return new OrderItemListState()
}
