import type { PurchaseOrderModel } from '@/models/PurchaseOrder/Model'
import PurchaseOrdersApi from '@/models/PurchaseOrder/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PurchaseOrderDetailsState extends DetailsState<PurchaseOrdersApi, PurchaseOrderModel> {
	api = new PurchaseOrdersApi()
}

export function usePurchaseOrderDetailsState() {
	return new PurchaseOrderDetailsState()
}

export class PurchaseOrderListState extends ListState<
	PurchaseOrdersApi,
	PurchaseOrderModel,
	LaravelPaginationResponse<PurchaseOrderModel>
> {
	api = new PurchaseOrdersApi()
}

export function usePurchaseOrderListState() {
	return new PurchaseOrderListState()
}
