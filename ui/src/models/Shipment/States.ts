import type { ShipmentModel } from '@/models/Shipment/Model'
import ShipmentsApi from '@/models/Shipment/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ShipmentDetailsState extends DetailsState<ShipmentsApi, ShipmentModel> {
	api = new ShipmentsApi()
}

export function useShipmentDetailsState() {
	return new ShipmentDetailsState()
}

export class ShipmentListState extends ListState<
	ShipmentsApi,
	ShipmentModel,
	LaravelPaginationResponse<ShipmentModel>
> {
	api = new ShipmentsApi()
}

export function useShipmentListState() {
	return new ShipmentListState()
}
