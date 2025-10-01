import type {
	DischargeSummaryModel,
	DischargeSummaryStorePayload,
	DischargeSummaryUpdatePayload,
} from '@/models/DischargeSummary/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DischargeSummarysApi extends Api<
	DischargeSummaryModel,
	LaravelPaginationResponse<DischargeSummaryModel>,
	DischargeSummaryStorePayload,
	DischargeSummaryUpdatePayload
> {
	route = 'discharge-summaries'
}
