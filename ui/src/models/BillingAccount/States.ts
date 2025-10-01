import type { BillingAccountModel } from '@/models/BillingAccount/Model'
import BillingAccountsApi from '@/models/BillingAccount/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BillingAccountDetailsState extends DetailsState<
	BillingAccountsApi,
	BillingAccountModel
> {
	api = new BillingAccountsApi()
}

export function useBillingAccountDetailsState() {
	return new BillingAccountDetailsState()
}

export class BillingAccountListState extends ListState<
	BillingAccountsApi,
	BillingAccountModel,
	LaravelPaginationResponse<BillingAccountModel>
> {
	api = new BillingAccountsApi()
}

export function useBillingAccountListState() {
	return new BillingAccountListState()
}
