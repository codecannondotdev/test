import type {
	InventoryItemModel,
	InventoryItemStorePayload,
	InventoryItemUpdatePayload,
} from '@/models/InventoryItem/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class InventoryItemsApi extends Api<
	InventoryItemModel,
	LaravelPaginationResponse<InventoryItemModel>,
	InventoryItemStorePayload,
	InventoryItemUpdatePayload
> {
	route = 'inventory-items'
}
