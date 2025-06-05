import type { ProductionBatchModel } from '@/models/ProductionBatch/Model'
import ProductionBatchsApi from '@/models/ProductionBatch/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ProductionBatchDetailsState extends DetailsState<
	ProductionBatchsApi,
	ProductionBatchModel
> {
	api = new ProductionBatchsApi()
}

export function useProductionBatchDetailsState() {
	return new ProductionBatchDetailsState()
}

export class ProductionBatchListState extends ListState<
	ProductionBatchsApi,
	ProductionBatchModel,
	LaravelPaginationResponse<ProductionBatchModel>
> {
	api = new ProductionBatchsApi()
}

export function useProductionBatchListState() {
	return new ProductionBatchListState()
}
