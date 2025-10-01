import type {
	AllergyModel,
	AllergyStorePayload,
	AllergyUpdatePayload,
} from '@/models/Allergy/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AllergysApi extends Api<
	AllergyModel,
	LaravelPaginationResponse<AllergyModel>,
	AllergyStorePayload,
	AllergyUpdatePayload
> {
	route = 'allergies'
}
