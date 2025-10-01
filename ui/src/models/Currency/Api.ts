import type {
	CurrencyModel,
	CurrencyStorePayload,
	CurrencyUpdatePayload,
} from '@/models/Currency/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CurrencysApi extends Api<
	CurrencyModel,
	LaravelPaginationResponse<CurrencyModel>,
	CurrencyStorePayload,
	CurrencyUpdatePayload
> {
	route = 'currencies'
}
