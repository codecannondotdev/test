import type { CurrencyModel } from '@/models/Currency/Model'
import CurrencysApi from '@/models/Currency/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CurrencyDetailsState extends DetailsState<CurrencysApi, CurrencyModel> {
	api = new CurrencysApi()
}

export function useCurrencyDetailsState() {
	return new CurrencyDetailsState()
}

export class CurrencyListState extends ListState<
	CurrencysApi,
	CurrencyModel,
	LaravelPaginationResponse<CurrencyModel>
> {
	api = new CurrencysApi()
}

export function useCurrencyListState() {
	return new CurrencyListState()
}
