import type {
	HomeCareVisitModel,
	HomeCareVisitStorePayload,
	HomeCareVisitUpdatePayload,
} from '@/models/HomeCareVisit/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class HomeCareVisitsApi extends Api<
	HomeCareVisitModel,
	LaravelPaginationResponse<HomeCareVisitModel>,
	HomeCareVisitStorePayload,
	HomeCareVisitUpdatePayload
> {
	route = 'home-care-visits'
}
