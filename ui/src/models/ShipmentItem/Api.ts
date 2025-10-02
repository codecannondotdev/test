import type {
	ShipmentItemModel,
	ShipmentItemStorePayload,
	ShipmentItemUpdatePayload,
} from '@/models/ShipmentItem/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ShipmentItemsApi extends Api<
	ShipmentItemModel,
	LaravelPaginationResponse<ShipmentItemModel>,
	ShipmentItemStorePayload,
	ShipmentItemUpdatePayload
> {
	route = 'shipment-items'
}
