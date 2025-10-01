import type { MortalityReportModel } from '@/models/MortalityReport/Model'
import MortalityReportsApi from '@/models/MortalityReport/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MortalityReportDetailsState extends DetailsState<
	MortalityReportsApi,
	MortalityReportModel
> {
	api = new MortalityReportsApi()
}

export function useMortalityReportDetailsState() {
	return new MortalityReportDetailsState()
}

export class MortalityReportListState extends ListState<
	MortalityReportsApi,
	MortalityReportModel,
	LaravelPaginationResponse<MortalityReportModel>
> {
	api = new MortalityReportsApi()
}

export function useMortalityReportListState() {
	return new MortalityReportListState()
}
