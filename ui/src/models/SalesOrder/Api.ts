import type {
	SalesOrderModel,
	SalesOrderStorePayload,
	SalesOrderUpdatePayload,
} from '@/models/SalesOrder/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SalesOrdersApi extends Api<
	SalesOrderModel,
	LaravelPaginationResponse<SalesOrderModel>,
	SalesOrderStorePayload,
	SalesOrderUpdatePayload
> {
	route = 'sales-orders'
}
