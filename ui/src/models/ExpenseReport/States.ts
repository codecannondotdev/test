import type { ExpenseReportModel } from '@/models/ExpenseReport/Model'
import ExpenseReportsApi from '@/models/ExpenseReport/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ExpenseReportDetailsState extends DetailsState<ExpenseReportsApi, ExpenseReportModel> {
	api = new ExpenseReportsApi()
}

export function useExpenseReportDetailsState() {
	return new ExpenseReportDetailsState()
}

export class ExpenseReportListState extends ListState<
	ExpenseReportsApi,
	ExpenseReportModel,
	LaravelPaginationResponse<ExpenseReportModel>
> {
	api = new ExpenseReportsApi()
}

export function useExpenseReportListState() {
	return new ExpenseReportListState()
}
