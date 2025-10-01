import type {
	PharmacyOrderModel,
	PharmacyOrderStorePayload,
	PharmacyOrderUpdatePayload,
} from '@/models/PharmacyOrder/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PharmacyOrdersApi extends Api<
	PharmacyOrderModel,
	LaravelPaginationResponse<PharmacyOrderModel>,
	PharmacyOrderStorePayload,
	PharmacyOrderUpdatePayload
> {
	route = 'pharmacy-orders'
}
