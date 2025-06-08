import type {
	CarModelModel,
	CarModelStorePayload,
	CarModelUpdatePayload,
} from '@/models/CarModel/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CarModelsApi extends Api<
	CarModelModel,
	LaravelPaginationResponse<CarModelModel>,
	CarModelStorePayload,
	CarModelUpdatePayload
> {
	route = 'car-models'
}
