import type { PathologyReportModel } from '@/models/PathologyReport/Model'
import PathologyReportsApi from '@/models/PathologyReport/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PathologyReportDetailsState extends DetailsState<
	PathologyReportsApi,
	PathologyReportModel
> {
	api = new PathologyReportsApi()
}

export function usePathologyReportDetailsState() {
	return new PathologyReportDetailsState()
}

export class PathologyReportListState extends ListState<
	PathologyReportsApi,
	PathologyReportModel,
	LaravelPaginationResponse<PathologyReportModel>
> {
	api = new PathologyReportsApi()
}

export function usePathologyReportListState() {
	return new PathologyReportListState()
}
