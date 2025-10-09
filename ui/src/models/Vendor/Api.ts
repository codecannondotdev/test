import type { VendorModel, VendorStorePayload, VendorUpdatePayload } from '@/models/Vendor/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class VendorsApi extends Api<
	VendorModel,
	LaravelPaginationResponse<VendorModel>,
	VendorStorePayload,
	VendorUpdatePayload
> {
	route = 'vendors'
}
