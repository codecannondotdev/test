import type {
	ReceiptModel,
	ReceiptStorePayload,
	ReceiptUpdatePayload,
} from '@/models/Receipt/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ReceiptsApi extends Api<
	ReceiptModel,
	LaravelPaginationResponse<ReceiptModel>,
	ReceiptStorePayload,
	ReceiptUpdatePayload
> {
	route = 'receipts'
}
