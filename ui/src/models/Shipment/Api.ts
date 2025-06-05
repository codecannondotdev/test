import type {
	ShipmentModel,
	ShipmentStorePayload,
	ShipmentUpdatePayload,
} from '@/models/Shipment/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ShipmentsApi extends Api<
	ShipmentModel,
	LaravelPaginationResponse<ShipmentModel>,
	ShipmentStorePayload,
	ShipmentUpdatePayload
> {
	route = 'shipments'
}
