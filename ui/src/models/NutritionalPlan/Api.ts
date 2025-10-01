import type {
	NutritionalPlanModel,
	NutritionalPlanStorePayload,
	NutritionalPlanUpdatePayload,
} from '@/models/NutritionalPlan/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class NutritionalPlansApi extends Api<
	NutritionalPlanModel,
	LaravelPaginationResponse<NutritionalPlanModel>,
	NutritionalPlanStorePayload,
	NutritionalPlanUpdatePayload
> {
	route = 'nutritional-plans'
}
