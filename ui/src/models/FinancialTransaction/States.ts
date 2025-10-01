import type { FinancialTransactionModel } from '@/models/FinancialTransaction/Model'
import FinancialTransactionsApi from '@/models/FinancialTransaction/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class FinancialTransactionDetailsState extends DetailsState<
	FinancialTransactionsApi,
	FinancialTransactionModel
> {
	api = new FinancialTransactionsApi()
}

export function useFinancialTransactionDetailsState() {
	return new FinancialTransactionDetailsState()
}

export class FinancialTransactionListState extends ListState<
	FinancialTransactionsApi,
	FinancialTransactionModel,
	LaravelPaginationResponse<FinancialTransactionModel>
> {
	api = new FinancialTransactionsApi()
}

export function useFinancialTransactionListState() {
	return new FinancialTransactionListState()
}
