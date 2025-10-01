import type {
	AnesthesiaModel,
	AnesthesiaStorePayload,
	AnesthesiaUpdatePayload,
} from '@/models/Anesthesia/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AnesthesiasApi extends Api<
	AnesthesiaModel,
	LaravelPaginationResponse<AnesthesiaModel>,
	AnesthesiaStorePayload,
	AnesthesiaUpdatePayload
> {
	route = 'anesthesia'
}
