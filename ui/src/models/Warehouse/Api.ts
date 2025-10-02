import type {
	WarehouseModel,
	WarehouseStorePayload,
	WarehouseUpdatePayload,
} from '@/models/Warehouse/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class WarehousesApi extends Api<
	WarehouseModel,
	LaravelPaginationResponse<WarehouseModel>,
	WarehouseStorePayload,
	WarehouseUpdatePayload
> {
	route = 'warehouses'
}
