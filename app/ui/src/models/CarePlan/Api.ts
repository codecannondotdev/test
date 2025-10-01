import type {
	CarePlanModel,
	CarePlanStorePayload,
	CarePlanUpdatePayload,
} from '@/models/CarePlan/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CarePlansApi extends Api<
	CarePlanModel,
	LaravelPaginationResponse<CarePlanModel>,
	CarePlanStorePayload,
	CarePlanUpdatePayload
> {
	route = 'care-plans'
}
