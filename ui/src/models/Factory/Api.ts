import type {
	FactoryModel,
	FactoryStorePayload,
	FactoryUpdatePayload,
} from '@/models/Factory/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class FactorysApi extends Api<
	FactoryModel,
	LaravelPaginationResponse<FactoryModel>,
	FactoryStorePayload,
	FactoryUpdatePayload
> {
	route = 'factories'
}
