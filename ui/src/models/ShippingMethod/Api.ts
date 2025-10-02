import type {
	ShippingMethodModel,
	ShippingMethodStorePayload,
	ShippingMethodUpdatePayload,
} from '@/models/ShippingMethod/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ShippingMethodsApi extends Api<
	ShippingMethodModel,
	LaravelPaginationResponse<ShippingMethodModel>,
	ShippingMethodStorePayload,
	ShippingMethodUpdatePayload
> {
	route = 'shipping-methods'
}
