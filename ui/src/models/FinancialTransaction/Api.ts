import type {
	FinancialTransactionModel,
	FinancialTransactionStorePayload,
	FinancialTransactionUpdatePayload,
} from '@/models/FinancialTransaction/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class FinancialTransactionsApi extends Api<
	FinancialTransactionModel,
	LaravelPaginationResponse<FinancialTransactionModel>,
	FinancialTransactionStorePayload,
	FinancialTransactionUpdatePayload
> {
	route = 'financial-transactions'
}
