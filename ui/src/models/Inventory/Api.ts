import type {
	InventoryModel,
	InventoryStorePayload,
	InventoryUpdatePayload,
} from '@/models/Inventory/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class InventorysApi extends Api<
	InventoryModel,
	LaravelPaginationResponse<InventoryModel>,
	InventoryStorePayload,
	InventoryUpdatePayload
> {
	route = 'inventories'
}
