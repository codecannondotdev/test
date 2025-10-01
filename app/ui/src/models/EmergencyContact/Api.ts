import type {
	EmergencyContactModel,
	EmergencyContactStorePayload,
	EmergencyContactUpdatePayload,
} from '@/models/EmergencyContact/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class EmergencyContactsApi extends Api<
	EmergencyContactModel,
	LaravelPaginationResponse<EmergencyContactModel>,
	EmergencyContactStorePayload,
	EmergencyContactUpdatePayload
> {
	route = 'emergency-contacts'
}
