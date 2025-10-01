import type { BloodProductModel } from '@/models/BloodProduct/Model'
import BloodProductsApi from '@/models/BloodProduct/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BloodProductDetailsState extends DetailsState<BloodProductsApi, BloodProductModel> {
	api = new BloodProductsApi()
}

export function useBloodProductDetailsState() {
	return new BloodProductDetailsState()
}

export class BloodProductListState extends ListState<
	BloodProductsApi,
	BloodProductModel,
	LaravelPaginationResponse<BloodProductModel>
> {
	api = new BloodProductsApi()
}

export function useBloodProductListState() {
	return new BloodProductListState()
}
