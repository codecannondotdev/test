import type {
	ProcurementOrderModel,
	ProcurementOrderStorePayload,
	ProcurementOrderUpdatePayload,
} from '@/models/ProcurementOrder/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ProcurementOrdersApi extends Api<
	ProcurementOrderModel,
	LaravelPaginationResponse<ProcurementOrderModel>,
	ProcurementOrderStorePayload,
	ProcurementOrderUpdatePayload
> {
	route = 'procurement-orders'
}
