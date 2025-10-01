import type {
	DischargeModel,
	DischargeStorePayload,
	DischargeUpdatePayload,
} from '@/models/Discharge/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DischargesApi extends Api<
	DischargeModel,
	LaravelPaginationResponse<DischargeModel>,
	DischargeStorePayload,
	DischargeUpdatePayload
> {
	route = 'discharges'
}
