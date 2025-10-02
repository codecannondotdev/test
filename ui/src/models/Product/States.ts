import type { ProductModel } from '@/models/Product/Model'
import ProductsApi from '@/models/Product/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ProductDetailsState extends DetailsState<ProductsApi, ProductModel> {
	api = new ProductsApi()
}

export function useProductDetailsState() {
	return new ProductDetailsState()
}

export class ProductListState extends ListState<
	ProductsApi,
	ProductModel,
	LaravelPaginationResponse<ProductModel>
> {
	api = new ProductsApi()
}

export function useProductListState() {
	return new ProductListState()
}
