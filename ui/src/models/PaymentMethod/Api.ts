import type {
	PaymentMethodModel,
	PaymentMethodStorePayload,
	PaymentMethodUpdatePayload,
} from '@/models/PaymentMethod/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PaymentMethodsApi extends Api<
	PaymentMethodModel,
	LaravelPaginationResponse<PaymentMethodModel>,
	PaymentMethodStorePayload,
	PaymentMethodUpdatePayload
> {
	route = 'payment-methods'
}
