import type {
	AsdfasdfasdModel,
	AsdfasdfasdStorePayload,
	AsdfasdfasdUpdatePayload,
} from '@/models/Asdfasdfasd/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AsdfasdfasdsApi extends Api<
	AsdfasdfasdModel,
	LaravelPaginationResponse<AsdfasdfasdModel>,
	AsdfasdfasdStorePayload,
	AsdfasdfasdUpdatePayload
> {
	route = 'asdfasdfasds'
}
