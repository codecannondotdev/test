import type {
	ReturnModelModel,
	ReturnModelStorePayload,
	ReturnModelUpdatePayload,
} from '@/models/ReturnModel/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ReturnModelsApi extends Api<
	ReturnModelModel,
	LaravelPaginationResponse<ReturnModelModel>,
	ReturnModelStorePayload,
	ReturnModelUpdatePayload
> {
	route = 'returns'
}
