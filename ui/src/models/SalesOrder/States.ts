import type { SalesOrderModel } from '@/models/SalesOrder/Model'
import SalesOrdersApi from '@/models/SalesOrder/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SalesOrderDetailsState extends DetailsState<SalesOrdersApi, SalesOrderModel> {
	api = new SalesOrdersApi()
}

export function useSalesOrderDetailsState() {
	return new SalesOrderDetailsState()
}

export class SalesOrderListState extends ListState<
	SalesOrdersApi,
	SalesOrderModel,
	LaravelPaginationResponse<SalesOrderModel>
> {
	api = new SalesOrdersApi()
}

export function useSalesOrderListState() {
	return new SalesOrderListState()
}
