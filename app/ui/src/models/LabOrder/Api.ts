import type {
	LabOrderModel,
	LabOrderStorePayload,
	LabOrderUpdatePayload,
} from '@/models/LabOrder/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class LabOrdersApi extends Api<
	LabOrderModel,
	LaravelPaginationResponse<LabOrderModel>,
	LabOrderStorePayload,
	LabOrderUpdatePayload
> {
	route = 'lab-orders'
}
