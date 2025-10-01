import type {
	VitalSignModel,
	VitalSignStorePayload,
	VitalSignUpdatePayload,
} from '@/models/VitalSign/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class VitalSignsApi extends Api<
	VitalSignModel,
	LaravelPaginationResponse<VitalSignModel>,
	VitalSignStorePayload,
	VitalSignUpdatePayload
> {
	route = 'vital-signs'
}
