import type { PaymentMethodModel } from '@/models/PaymentMethod/Model'
import PaymentMethodsApi from '@/models/PaymentMethod/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PaymentMethodDetailsState extends DetailsState<PaymentMethodsApi, PaymentMethodModel> {
	api = new PaymentMethodsApi()
}

export function usePaymentMethodDetailsState() {
	return new PaymentMethodDetailsState()
}

export class PaymentMethodListState extends ListState<
	PaymentMethodsApi,
	PaymentMethodModel,
	LaravelPaginationResponse<PaymentMethodModel>
> {
	api = new PaymentMethodsApi()
}

export function usePaymentMethodListState() {
	return new PaymentMethodListState()
}
