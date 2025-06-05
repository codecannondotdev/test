import type {
	SupplierModel,
	SupplierStorePayload,
	SupplierUpdatePayload,
} from '@/models/Supplier/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SuppliersApi extends Api<
	SupplierModel,
	LaravelPaginationResponse<SupplierModel>,
	SupplierStorePayload,
	SupplierUpdatePayload
> {
	route = 'suppliers'
}
