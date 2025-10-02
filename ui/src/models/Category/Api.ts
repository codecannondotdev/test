import type {
	CategoryModel,
	CategoryStorePayload,
	CategoryUpdatePayload,
} from '@/models/Category/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CategorysApi extends Api<
	CategoryModel,
	LaravelPaginationResponse<CategoryModel>,
	CategoryStorePayload,
	CategoryUpdatePayload
> {
	route = 'categories'
}
