import type { BudgetModel } from '@/models/Budget/Model'
import BudgetsApi from '@/models/Budget/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BudgetDetailsState extends DetailsState<BudgetsApi, BudgetModel> {
	api = new BudgetsApi()
}

export function useBudgetDetailsState() {
	return new BudgetDetailsState()
}

export class BudgetListState extends ListState<
	BudgetsApi,
	BudgetModel,
	LaravelPaginationResponse<BudgetModel>
> {
	api = new BudgetsApi()
}

export function useBudgetListState() {
	return new BudgetListState()
}
