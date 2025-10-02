import type {
	DamageReportModel,
	DamageReportStorePayload,
	DamageReportUpdatePayload,
} from '@/models/DamageReport/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DamageReportsApi extends Api<
	DamageReportModel,
	LaravelPaginationResponse<DamageReportModel>,
	DamageReportStorePayload,
	DamageReportUpdatePayload
> {
	route = 'damage-reports'
}
