import type {
	SpecialtyModel,
	SpecialtyStorePayload,
	SpecialtyUpdatePayload,
} from '@/models/Specialty/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SpecialtysApi extends Api<
	SpecialtyModel,
	LaravelPaginationResponse<SpecialtyModel>,
	SpecialtyStorePayload,
	SpecialtyUpdatePayload
> {
	route = 'specialties'
}
