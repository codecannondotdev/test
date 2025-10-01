import type {
	FacilityModel,
	FacilityStorePayload,
	FacilityUpdatePayload,
} from '@/models/Facility/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class FacilitysApi extends Api<
	FacilityModel,
	LaravelPaginationResponse<FacilityModel>,
	FacilityStorePayload,
	FacilityUpdatePayload
> {
	route = 'facilities'
}
