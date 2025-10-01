import type { VisitModel, VisitStorePayload, VisitUpdatePayload } from '@/models/Visit/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class VisitsApi extends Api<
	VisitModel,
	LaravelPaginationResponse<VisitModel>,
	VisitStorePayload,
	VisitUpdatePayload
> {
	route = 'visits'
}
