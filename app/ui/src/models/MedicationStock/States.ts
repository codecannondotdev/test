import type { MedicationStockModel } from '@/models/MedicationStock/Model'
import MedicationStocksApi from '@/models/MedicationStock/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MedicationStockDetailsState extends DetailsState<
	MedicationStocksApi,
	MedicationStockModel
> {
	api = new MedicationStocksApi()
}

export function useMedicationStockDetailsState() {
	return new MedicationStockDetailsState()
}

export class MedicationStockListState extends ListState<
	MedicationStocksApi,
	MedicationStockModel,
	LaravelPaginationResponse<MedicationStockModel>
> {
	api = new MedicationStocksApi()
}

export function useMedicationStockListState() {
	return new MedicationStockListState()
}
