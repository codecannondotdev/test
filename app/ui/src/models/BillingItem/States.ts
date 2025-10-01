import type { BillingItemModel } from '@/models/BillingItem/Model'
import BillingItemsApi from '@/models/BillingItem/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BillingItemDetailsState extends DetailsState<BillingItemsApi, BillingItemModel> {
	api = new BillingItemsApi()
}

export function useBillingItemDetailsState() {
	return new BillingItemDetailsState()
}

export class BillingItemListState extends ListState<
	BillingItemsApi,
	BillingItemModel,
	LaravelPaginationResponse<BillingItemModel>
> {
	api = new BillingItemsApi()
}

export function useBillingItemListState() {
	return new BillingItemListState()
}
