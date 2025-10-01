import type {
	BloodProductModel,
	BloodProductStorePayload,
	BloodProductUpdatePayload,
} from '@/models/BloodProduct/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BloodProductsApi extends Api<
	BloodProductModel,
	LaravelPaginationResponse<BloodProductModel>,
	BloodProductStorePayload,
	BloodProductUpdatePayload
> {
	route = 'blood-products'
}
