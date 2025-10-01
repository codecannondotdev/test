import type {
	AutopsyReportModel,
	AutopsyReportStorePayload,
	AutopsyReportUpdatePayload,
} from '@/models/AutopsyReport/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AutopsyReportsApi extends Api<
	AutopsyReportModel,
	LaravelPaginationResponse<AutopsyReportModel>,
	AutopsyReportStorePayload,
	AutopsyReportUpdatePayload
> {
	route = 'autopsy-reports'
}
