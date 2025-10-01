import type {
	InvoiceModel,
	InvoiceStorePayload,
	InvoiceUpdatePayload,
} from '@/models/Invoice/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class InvoicesApi extends Api<
	InvoiceModel,
	LaravelPaginationResponse<InvoiceModel>,
	InvoiceStorePayload,
	InvoiceUpdatePayload
> {
	route = 'invoices'
}
