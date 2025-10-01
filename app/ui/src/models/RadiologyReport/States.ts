import type { RadiologyReportModel } from '@/models/RadiologyReport/Model'
import RadiologyReportsApi from '@/models/RadiologyReport/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class RadiologyReportDetailsState extends DetailsState<
	RadiologyReportsApi,
	RadiologyReportModel
> {
	api = new RadiologyReportsApi()
}

export function useRadiologyReportDetailsState() {
	return new RadiologyReportDetailsState()
}

export class RadiologyReportListState extends ListState<
	RadiologyReportsApi,
	RadiologyReportModel,
	LaravelPaginationResponse<RadiologyReportModel>
> {
	api = new RadiologyReportsApi()
}

export function useRadiologyReportListState() {
	return new RadiologyReportListState()
}
