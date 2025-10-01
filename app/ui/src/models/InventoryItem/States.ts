import type { InventoryItemModel } from '@/models/InventoryItem/Model'
import InventoryItemsApi from '@/models/InventoryItem/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class InventoryItemDetailsState extends DetailsState<InventoryItemsApi, InventoryItemModel> {
	api = new InventoryItemsApi()
}

export function useInventoryItemDetailsState() {
	return new InventoryItemDetailsState()
}

export class InventoryItemListState extends ListState<
	InventoryItemsApi,
	InventoryItemModel,
	LaravelPaginationResponse<InventoryItemModel>
> {
	api = new InventoryItemsApi()
}

export function useInventoryItemListState() {
	return new InventoryItemListState()
}
