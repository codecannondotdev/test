import type { DamageReportModel } from '@/models/DamageReport/Model'
import DamageReportsApi from '@/models/DamageReport/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DamageReportDetailsState extends DetailsState<DamageReportsApi, DamageReportModel> {
	api = new DamageReportsApi()
}

export function useDamageReportDetailsState() {
	return new DamageReportDetailsState()
}

export class DamageReportListState extends ListState<
	DamageReportsApi,
	DamageReportModel,
	LaravelPaginationResponse<DamageReportModel>
> {
	api = new DamageReportsApi()
}

export function useDamageReportListState() {
	return new DamageReportListState()
}
