import type {
	PaymentModel,
	PaymentStorePayload,
	PaymentUpdatePayload,
} from '@/models/Payment/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PaymentsApi extends Api<
	PaymentModel,
	LaravelPaginationResponse<PaymentModel>,
	PaymentStorePayload,
	PaymentUpdatePayload
> {
	route = 'payments'
}
