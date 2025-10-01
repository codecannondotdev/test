import type {
	TransfusionModel,
	TransfusionStorePayload,
	TransfusionUpdatePayload,
} from '@/models/Transfusion/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TransfusionsApi extends Api<
	TransfusionModel,
	LaravelPaginationResponse<TransfusionModel>,
	TransfusionStorePayload,
	TransfusionUpdatePayload
> {
	route = 'transfusions'
}
