import type {
	PathologyReportModel,
	PathologyReportStorePayload,
	PathologyReportUpdatePayload,
} from '@/models/PathologyReport/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PathologyReportsApi extends Api<
	PathologyReportModel,
	LaravelPaginationResponse<PathologyReportModel>,
	PathologyReportStorePayload,
	PathologyReportUpdatePayload
> {
	route = 'pathology-reports'
}
