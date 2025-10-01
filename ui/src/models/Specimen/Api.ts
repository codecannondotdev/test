import type {
	SpecimenModel,
	SpecimenStorePayload,
	SpecimenUpdatePayload,
} from '@/models/Specimen/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SpecimensApi extends Api<
	SpecimenModel,
	LaravelPaginationResponse<SpecimenModel>,
	SpecimenStorePayload,
	SpecimenUpdatePayload
> {
	route = 'specimens'
}
