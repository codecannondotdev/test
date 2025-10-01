import type { TaxRateModel } from '@/models/TaxRate/Model'
import TaxRatesApi from '@/models/TaxRate/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TaxRateDetailsState extends DetailsState<TaxRatesApi, TaxRateModel> {
	api = new TaxRatesApi()
}

export function useTaxRateDetailsState() {
	return new TaxRateDetailsState()
}

export class TaxRateListState extends ListState<
	TaxRatesApi,
	TaxRateModel,
	LaravelPaginationResponse<TaxRateModel>
> {
	api = new TaxRatesApi()
}

export function useTaxRateListState() {
	return new TaxRateListState()
}
