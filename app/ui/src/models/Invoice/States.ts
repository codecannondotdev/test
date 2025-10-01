import type { InvoiceModel } from '@/models/Invoice/Model'
import InvoicesApi from '@/models/Invoice/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class InvoiceDetailsState extends DetailsState<InvoicesApi, InvoiceModel> {
	api = new InvoicesApi()
}

export function useInvoiceDetailsState() {
	return new InvoiceDetailsState()
}

export class InvoiceListState extends ListState<
	InvoicesApi,
	InvoiceModel,
	LaravelPaginationResponse<InvoiceModel>
> {
	api = new InvoicesApi()
}

export function useInvoiceListState() {
	return new InvoiceListState()
}
