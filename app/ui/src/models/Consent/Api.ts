import type {
	ConsentModel,
	ConsentStorePayload,
	ConsentUpdatePayload,
} from '@/models/Consent/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ConsentsApi extends Api<
	ConsentModel,
	LaravelPaginationResponse<ConsentModel>,
	ConsentStorePayload,
	ConsentUpdatePayload
> {
	route = 'consents'
}
