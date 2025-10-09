import type {
	ExpenseReportModel,
	ExpenseReportStorePayload,
	ExpenseReportUpdatePayload,
} from '@/models/ExpenseReport/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ExpenseReportsApi extends Api<
	ExpenseReportModel,
	LaravelPaginationResponse<ExpenseReportModel>,
	ExpenseReportStorePayload,
	ExpenseReportUpdatePayload
> {
	route = 'expense-reports'
}
