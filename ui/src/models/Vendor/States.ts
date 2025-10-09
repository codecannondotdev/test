import type { VendorModel } from '@/models/Vendor/Model'
import VendorsApi from '@/models/Vendor/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class VendorDetailsState extends DetailsState<VendorsApi, VendorModel> {
	api = new VendorsApi()
}

export function useVendorDetailsState() {
	return new VendorDetailsState()
}

export class VendorListState extends ListState<
	VendorsApi,
	VendorModel,
	LaravelPaginationResponse<VendorModel>
> {
	api = new VendorsApi()
}

export function useVendorListState() {
	return new VendorListState()
}
