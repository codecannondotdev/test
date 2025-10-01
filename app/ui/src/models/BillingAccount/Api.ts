import type {
	BillingAccountModel,
	BillingAccountStorePayload,
	BillingAccountUpdatePayload,
} from '@/models/BillingAccount/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BillingAccountsApi extends Api<
	BillingAccountModel,
	LaravelPaginationResponse<BillingAccountModel>,
	BillingAccountStorePayload,
	BillingAccountUpdatePayload
> {
	route = 'billing-accounts'
}
