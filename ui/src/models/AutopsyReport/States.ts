import type { AutopsyReportModel } from '@/models/AutopsyReport/Model'
import AutopsyReportsApi from '@/models/AutopsyReport/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AutopsyReportDetailsState extends DetailsState<AutopsyReportsApi, AutopsyReportModel> {
	api = new AutopsyReportsApi()
}

export function useAutopsyReportDetailsState() {
	return new AutopsyReportDetailsState()
}

export class AutopsyReportListState extends ListState<
	AutopsyReportsApi,
	AutopsyReportModel,
	LaravelPaginationResponse<AutopsyReportModel>
> {
	api = new AutopsyReportsApi()
}

export function useAutopsyReportListState() {
	return new AutopsyReportListState()
}
