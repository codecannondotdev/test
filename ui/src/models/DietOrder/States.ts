import type { DietOrderModel } from '@/models/DietOrder/Model'
import DietOrdersApi from '@/models/DietOrder/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DietOrderDetailsState extends DetailsState<DietOrdersApi, DietOrderModel> {
	api = new DietOrdersApi()
}

export function useDietOrderDetailsState() {
	return new DietOrderDetailsState()
}

export class DietOrderListState extends ListState<
	DietOrdersApi,
	DietOrderModel,
	LaravelPaginationResponse<DietOrderModel>
> {
	api = new DietOrdersApi()
}

export function useDietOrderListState() {
	return new DietOrderListState()
}
