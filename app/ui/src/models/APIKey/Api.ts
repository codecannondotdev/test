import type { APIKeyModel, APIKeyStorePayload, APIKeyUpdatePayload } from '@/models/APIKey/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class APIKeysApi extends Api<
	APIKeyModel,
	LaravelPaginationResponse<APIKeyModel>,
	APIKeyStorePayload,
	APIKeyUpdatePayload
> {
	route = 'api-keys'
}
