import type {
	LedgerAccountModel,
	LedgerAccountStorePayload,
	LedgerAccountUpdatePayload,
} from '@/models/LedgerAccount/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class LedgerAccountsApi extends Api<
	LedgerAccountModel,
	LaravelPaginationResponse<LedgerAccountModel>,
	LedgerAccountStorePayload,
	LedgerAccountUpdatePayload
> {
	route = 'ledger-accounts'
}
