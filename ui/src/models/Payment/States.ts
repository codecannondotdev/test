import type { PaymentModel } from '@/models/Payment/Model'
import PaymentsApi from '@/models/Payment/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PaymentDetailsState extends DetailsState<PaymentsApi, PaymentModel> {
	api = new PaymentsApi()
}

export function usePaymentDetailsState() {
	return new PaymentDetailsState()
}

export class PaymentListState extends ListState<
	PaymentsApi,
	PaymentModel,
	LaravelPaginationResponse<PaymentModel>
> {
	api = new PaymentsApi()
}

export function usePaymentListState() {
	return new PaymentListState()
}
