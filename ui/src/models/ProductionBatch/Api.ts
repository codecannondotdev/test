import type {
	ProductionBatchModel,
	ProductionBatchStorePayload,
	ProductionBatchUpdatePayload,
} from '@/models/ProductionBatch/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ProductionBatchsApi extends Api<
	ProductionBatchModel,
	LaravelPaginationResponse<ProductionBatchModel>,
	ProductionBatchStorePayload,
	ProductionBatchUpdatePayload
> {
	route = 'production-batches'
}
