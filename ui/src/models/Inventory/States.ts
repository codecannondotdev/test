import type { InventoryModel } from '@/models/Inventory/Model'
import InventorysApi from '@/models/Inventory/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class InventoryDetailsState extends DetailsState<InventorysApi, InventoryModel> {
	api = new InventorysApi()
}

export function useInventoryDetailsState() {
	return new InventoryDetailsState()
}

export class InventoryListState extends ListState<
	InventorysApi,
	InventoryModel,
	LaravelPaginationResponse<InventoryModel>
> {
	api = new InventorysApi()
}

export function useInventoryListState() {
	return new InventoryListState()
}
