import type {
	FamilyContactModel,
	FamilyContactStorePayload,
	FamilyContactUpdatePayload,
} from '@/models/FamilyContact/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class FamilyContactsApi extends Api<
	FamilyContactModel,
	LaravelPaginationResponse<FamilyContactModel>,
	FamilyContactStorePayload,
	FamilyContactUpdatePayload
> {
	route = 'family-contacts'
}
