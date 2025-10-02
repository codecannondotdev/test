import type { WarehouseModel } from '@/models/Warehouse/Model'
import WarehousesApi from '@/models/Warehouse/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class WarehouseDetailsState extends DetailsState<WarehousesApi, WarehouseModel> {
	api = new WarehousesApi()
}

export function useWarehouseDetailsState() {
	return new WarehouseDetailsState()
}

export class WarehouseListState extends ListState<
	WarehousesApi,
	WarehouseModel,
	LaravelPaginationResponse<WarehouseModel>
> {
	api = new WarehousesApi()
}

export function useWarehouseListState() {
	return new WarehouseListState()
}
