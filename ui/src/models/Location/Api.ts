import type {
	LocationModel,
	LocationStorePayload,
	LocationUpdatePayload,
} from '@/models/Location/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class LocationsApi extends Api<
	LocationModel,
	LaravelPaginationResponse<LocationModel>,
	LocationStorePayload,
	LocationUpdatePayload
> {
	route = 'locations'
}
