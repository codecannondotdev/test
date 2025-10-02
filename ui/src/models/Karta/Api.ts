import type { KartaModel, KartaStorePayload, KartaUpdatePayload } from '@/models/Karta/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class KartasApi extends Api<
	KartaModel,
	LaravelPaginationResponse<KartaModel>,
	KartaStorePayload,
	KartaUpdatePayload
> {
	route = 'kartas'
}
