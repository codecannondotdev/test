import type {
	ExpenseModel,
	ExpenseStorePayload,
	ExpenseUpdatePayload,
} from '@/models/Expense/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ExpensesApi extends Api<
	ExpenseModel,
	LaravelPaginationResponse<ExpenseModel>,
	ExpenseStorePayload,
	ExpenseUpdatePayload
> {
	route = 'expenses'
}
