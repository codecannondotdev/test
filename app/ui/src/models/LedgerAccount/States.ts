import type { LedgerAccountModel } from '@/models/LedgerAccount/Model'
import LedgerAccountsApi from '@/models/LedgerAccount/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class LedgerAccountDetailsState extends DetailsState<LedgerAccountsApi, LedgerAccountModel> {
	api = new LedgerAccountsApi()
}

export function useLedgerAccountDetailsState() {
	return new LedgerAccountDetailsState()
}

export class LedgerAccountListState extends ListState<
	LedgerAccountsApi,
	LedgerAccountModel,
	LaravelPaginationResponse<LedgerAccountModel>
> {
	api = new LedgerAccountsApi()
}

export function useLedgerAccountListState() {
	return new LedgerAccountListState()
}
