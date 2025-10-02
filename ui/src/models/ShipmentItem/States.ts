import type { ShipmentItemModel } from '@/models/ShipmentItem/Model'
import ShipmentItemsApi from '@/models/ShipmentItem/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ShipmentItemDetailsState extends DetailsState<ShipmentItemsApi, ShipmentItemModel> {
	api = new ShipmentItemsApi()
}

export function useShipmentItemDetailsState() {
	return new ShipmentItemDetailsState()
}

export class ShipmentItemListState extends ListState<
	ShipmentItemsApi,
	ShipmentItemModel,
	LaravelPaginationResponse<ShipmentItemModel>
> {
	api = new ShipmentItemsApi()
}

export function useShipmentItemListState() {
	return new ShipmentItemListState()
}
