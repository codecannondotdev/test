import type { BudgetModel, BudgetStorePayload, BudgetUpdatePayload } from '@/models/Budget/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BudgetsApi extends Api<
	BudgetModel,
	LaravelPaginationResponse<BudgetModel>,
	BudgetStorePayload,
	BudgetUpdatePayload
> {
	route = 'budgets'
}
