import type { PredalModel, PredalStorePayload, PredalUpdatePayload } from '@/models/Predal/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PredalsApi extends Api<
	PredalModel,
	LaravelPaginationResponse<PredalModel>,
	PredalStorePayload,
	PredalUpdatePayload
> {
	route = 'predals'
}
