import type {
	RadiologyReportModel,
	RadiologyReportStorePayload,
	RadiologyReportUpdatePayload,
} from '@/models/RadiologyReport/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class RadiologyReportsApi extends Api<
	RadiologyReportModel,
	LaravelPaginationResponse<RadiologyReportModel>,
	RadiologyReportStorePayload,
	RadiologyReportUpdatePayload
> {
	route = 'radiology-reports'
}
