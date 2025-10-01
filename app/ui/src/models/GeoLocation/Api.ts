import type {
	GeoLocationModel,
	GeoLocationStorePayload,
	GeoLocationUpdatePayload,
} from '@/models/GeoLocation/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class GeoLocationsApi extends Api<
	GeoLocationModel,
	LaravelPaginationResponse<GeoLocationModel>,
	GeoLocationStorePayload,
	GeoLocationUpdatePayload
> {
	route = 'geo-locations'
}
