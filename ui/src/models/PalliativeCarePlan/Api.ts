import type {
	PalliativeCarePlanModel,
	PalliativeCarePlanStorePayload,
	PalliativeCarePlanUpdatePayload,
} from '@/models/PalliativeCarePlan/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PalliativeCarePlansApi extends Api<
	PalliativeCarePlanModel,
	LaravelPaginationResponse<PalliativeCarePlanModel>,
	PalliativeCarePlanStorePayload,
	PalliativeCarePlanUpdatePayload
> {
	route = 'palliative-care-plans'
}
