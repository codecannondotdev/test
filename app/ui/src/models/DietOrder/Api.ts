import type {
	DietOrderModel,
	DietOrderStorePayload,
	DietOrderUpdatePayload,
} from '@/models/DietOrder/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DietOrdersApi extends Api<
	DietOrderModel,
	LaravelPaginationResponse<DietOrderModel>,
	DietOrderStorePayload,
	DietOrderUpdatePayload
> {
	route = 'diet-orders'
}
