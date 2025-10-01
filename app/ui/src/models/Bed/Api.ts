import type { BedModel, BedStorePayload, BedUpdatePayload } from '@/models/Bed/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BedsApi extends Api<
	BedModel,
	LaravelPaginationResponse<BedModel>,
	BedStorePayload,
	BedUpdatePayload
> {
	route = 'beds'
}
