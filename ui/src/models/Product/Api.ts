import type {
	ProductModel,
	ProductStorePayload,
	ProductUpdatePayload,
} from '@/models/Product/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ProductsApi extends Api<
	ProductModel,
	LaravelPaginationResponse<ProductModel>,
	ProductStorePayload,
	ProductUpdatePayload
> {
	route = 'products'
}
