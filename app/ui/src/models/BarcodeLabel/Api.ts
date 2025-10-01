import type {
	BarcodeLabelModel,
	BarcodeLabelStorePayload,
	BarcodeLabelUpdatePayload,
} from '@/models/BarcodeLabel/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BarcodeLabelsApi extends Api<
	BarcodeLabelModel,
	LaravelPaginationResponse<BarcodeLabelModel>,
	BarcodeLabelStorePayload,
	BarcodeLabelUpdatePayload
> {
	route = 'barcode-labels'
}
