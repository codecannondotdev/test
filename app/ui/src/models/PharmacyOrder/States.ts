import type { PharmacyOrderModel } from '@/models/PharmacyOrder/Model'
import PharmacyOrdersApi from '@/models/PharmacyOrder/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PharmacyOrderDetailsState extends DetailsState<PharmacyOrdersApi, PharmacyOrderModel> {
	api = new PharmacyOrdersApi()
}

export function usePharmacyOrderDetailsState() {
	return new PharmacyOrderDetailsState()
}

export class PharmacyOrderListState extends ListState<
	PharmacyOrdersApi,
	PharmacyOrderModel,
	LaravelPaginationResponse<PharmacyOrderModel>
> {
	api = new PharmacyOrdersApi()
}

export function usePharmacyOrderListState() {
	return new PharmacyOrderListState()
}
