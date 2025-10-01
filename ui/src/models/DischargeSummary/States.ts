import type { DischargeSummaryModel } from '@/models/DischargeSummary/Model'
import DischargeSummarysApi from '@/models/DischargeSummary/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DischargeSummaryDetailsState extends DetailsState<
	DischargeSummarysApi,
	DischargeSummaryModel
> {
	api = new DischargeSummarysApi()
}

export function useDischargeSummaryDetailsState() {
	return new DischargeSummaryDetailsState()
}

export class DischargeSummaryListState extends ListState<
	DischargeSummarysApi,
	DischargeSummaryModel,
	LaravelPaginationResponse<DischargeSummaryModel>
> {
	api = new DischargeSummarysApi()
}

export function useDischargeSummaryListState() {
	return new DischargeSummaryListState()
}
