import type { PurchaseOrderItemModel } from '@/models/PurchaseOrderItem/Model'
import PurchaseOrderItemsApi from '@/models/PurchaseOrderItem/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PurchaseOrderItemDetailsState extends DetailsState<
	PurchaseOrderItemsApi,
	PurchaseOrderItemModel
> {
	api = new PurchaseOrderItemsApi()
}

export function usePurchaseOrderItemDetailsState() {
	return new PurchaseOrderItemDetailsState()
}

export class PurchaseOrderItemListState extends ListState<
	PurchaseOrderItemsApi,
	PurchaseOrderItemModel,
	LaravelPaginationResponse<PurchaseOrderItemModel>
> {
	api = new PurchaseOrderItemsApi()
}

export function usePurchaseOrderItemListState() {
	return new PurchaseOrderItemListState()
}
