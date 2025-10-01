import type {
	HospiceCareModel,
	HospiceCareStorePayload,
	HospiceCareUpdatePayload,
} from '@/models/HospiceCare/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class HospiceCaresApi extends Api<
	HospiceCareModel,
	LaravelPaginationResponse<HospiceCareModel>,
	HospiceCareStorePayload,
	HospiceCareUpdatePayload
> {
	route = 'hospice-cares'
}
