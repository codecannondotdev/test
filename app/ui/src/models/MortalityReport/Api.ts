import type {
	MortalityReportModel,
	MortalityReportStorePayload,
	MortalityReportUpdatePayload,
} from '@/models/MortalityReport/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MortalityReportsApi extends Api<
	MortalityReportModel,
	LaravelPaginationResponse<MortalityReportModel>,
	MortalityReportStorePayload,
	MortalityReportUpdatePayload
> {
	route = 'mortality-reports'
}
