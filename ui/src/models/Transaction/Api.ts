import type {
	TransactionModel,
	TransactionStorePayload,
	TransactionUpdatePayload,
} from '@/models/Transaction/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TransactionsApi extends Api<
	TransactionModel,
	LaravelPaginationResponse<TransactionModel>,
	TransactionStorePayload,
	TransactionUpdatePayload
> {
	route = 'transactions'
}
