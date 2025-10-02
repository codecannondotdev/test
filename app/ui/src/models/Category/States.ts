import type { CategoryModel } from '@/models/Category/Model'
import CategorysApi from '@/models/Category/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CategoryDetailsState extends DetailsState<CategorysApi, CategoryModel> {
	api = new CategorysApi()
}

export function useCategoryDetailsState() {
	return new CategoryDetailsState()
}

export class CategoryListState extends ListState<
	CategorysApi,
	CategoryModel,
	LaravelPaginationResponse<CategoryModel>
> {
	api = new CategorysApi()
}

export function useCategoryListState() {
	return new CategoryListState()
}
