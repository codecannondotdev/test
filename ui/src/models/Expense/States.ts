import type { ExpenseModel } from '@/models/Expense/Model'
import ExpensesApi from '@/models/Expense/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ExpenseDetailsState extends DetailsState<ExpensesApi, ExpenseModel> {
	api = new ExpensesApi()
}

export function useExpenseDetailsState() {
	return new ExpenseDetailsState()
}

export class ExpenseListState extends ListState<
	ExpensesApi,
	ExpenseModel,
	LaravelPaginationResponse<ExpenseModel>
> {
	api = new ExpensesApi()
}

export function useExpenseListState() {
	return new ExpenseListState()
}
