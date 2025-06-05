import type {
	CustomerModel,
	CustomerStorePayload,
	CustomerUpdatePayload,
} from '@/models/Customer/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CustomersApi extends Api<
	CustomerModel,
	LaravelPaginationResponse<CustomerModel>,
	CustomerStorePayload,
	CustomerUpdatePayload
> {
	route = 'customers'
}
