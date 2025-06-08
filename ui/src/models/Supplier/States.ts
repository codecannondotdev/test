import type { SupplierModel } from '@/models/Supplier/Model'
import SuppliersApi from '@/models/Supplier/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SupplierDetailsState extends DetailsState<SuppliersApi, SupplierModel> {
	api = new SuppliersApi()
}

export function useSupplierDetailsState() {
	return new SupplierDetailsState()
}

export class SupplierListState extends ListState<
	SuppliersApi,
	SupplierModel,
	LaravelPaginationResponse<SupplierModel>
> {
	api = new SuppliersApi()
}

export function useSupplierListState() {
	return new SupplierListState()
}
