import type { ShippingMethodModel } from '@/models/ShippingMethod/Model'
import ShippingMethodsApi from '@/models/ShippingMethod/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ShippingMethodDetailsState extends DetailsState<
	ShippingMethodsApi,
	ShippingMethodModel
> {
	api = new ShippingMethodsApi()
}

export function useShippingMethodDetailsState() {
	return new ShippingMethodDetailsState()
}

export class ShippingMethodListState extends ListState<
	ShippingMethodsApi,
	ShippingMethodModel,
	LaravelPaginationResponse<ShippingMethodModel>
> {
	api = new ShippingMethodsApi()
}

export function useShippingMethodListState() {
	return new ShippingMethodListState()
}
