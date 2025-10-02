import type { TransactionModel } from '@/models/Transaction/Model'
import TransactionsApi from '@/models/Transaction/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TransactionDetailsState extends DetailsState<TransactionsApi, TransactionModel> {
	api = new TransactionsApi()
}

export function useTransactionDetailsState() {
	return new TransactionDetailsState()
}

export class TransactionListState extends ListState<
	TransactionsApi,
	TransactionModel,
	LaravelPaginationResponse<TransactionModel>
> {
	api = new TransactionsApi()
}

export function useTransactionListState() {
	return new TransactionListState()
}
