import type {
	IntegrationModel,
	IntegrationStorePayload,
	IntegrationUpdatePayload,
} from '@/models/Integration/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class IntegrationsApi extends Api<
	IntegrationModel,
	LaravelPaginationResponse<IntegrationModel>,
	IntegrationStorePayload,
	IntegrationUpdatePayload
> {
	route = 'integrations'
}
