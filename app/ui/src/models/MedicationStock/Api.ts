import type {
	MedicationStockModel,
	MedicationStockStorePayload,
	MedicationStockUpdatePayload,
} from '@/models/MedicationStock/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MedicationStocksApi extends Api<
	MedicationStockModel,
	LaravelPaginationResponse<MedicationStockModel>,
	MedicationStockStorePayload,
	MedicationStockUpdatePayload
> {
	route = 'medication-stocks'
}
