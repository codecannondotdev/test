import type {
	TaxRateModel,
	TaxRateStorePayload,
	TaxRateUpdatePayload,
} from '@/models/TaxRate/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TaxRatesApi extends Api<
	TaxRateModel,
	LaravelPaginationResponse<TaxRateModel>,
	TaxRateStorePayload,
	TaxRateUpdatePayload
> {
	route = 'tax-rates'
}
