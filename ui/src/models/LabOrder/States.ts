import type { LabOrderModel } from '@/models/LabOrder/Model'
import LabOrdersApi from '@/models/LabOrder/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class LabOrderDetailsState extends DetailsState<LabOrdersApi, LabOrderModel> {
	api = new LabOrdersApi()
}

export function useLabOrderDetailsState() {
	return new LabOrderDetailsState()
}

export class LabOrderListState extends ListState<
	LabOrdersApi,
	LabOrderModel,
	LaravelPaginationResponse<LabOrderModel>
> {
	api = new LabOrdersApi()
}

export function useLabOrderListState() {
	return new LabOrderListState()
}
