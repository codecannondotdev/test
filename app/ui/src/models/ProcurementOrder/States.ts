import type { ProcurementOrderModel } from '@/models/ProcurementOrder/Model'
import ProcurementOrdersApi from '@/models/ProcurementOrder/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ProcurementOrderDetailsState extends DetailsState<
	ProcurementOrdersApi,
	ProcurementOrderModel
> {
	api = new ProcurementOrdersApi()
}

export function useProcurementOrderDetailsState() {
	return new ProcurementOrderDetailsState()
}

export class ProcurementOrderListState extends ListState<
	ProcurementOrdersApi,
	ProcurementOrderModel,
	LaravelPaginationResponse<ProcurementOrderModel>
> {
	api = new ProcurementOrdersApi()
}

export function useProcurementOrderListState() {
	return new ProcurementOrderListState()
}
