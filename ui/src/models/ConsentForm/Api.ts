import type {
	ConsentFormModel,
	ConsentFormStorePayload,
	ConsentFormUpdatePayload,
} from '@/models/ConsentForm/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ConsentFormsApi extends Api<
	ConsentFormModel,
	LaravelPaginationResponse<ConsentFormModel>,
	ConsentFormStorePayload,
	ConsentFormUpdatePayload
> {
	route = 'consent-forms'
}
