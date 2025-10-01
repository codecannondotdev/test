import type { WardModel, WardStorePayload, WardUpdatePayload } from '@/models/Ward/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class WardsApi extends Api<
	WardModel,
	LaravelPaginationResponse<WardModel>,
	WardStorePayload,
	WardUpdatePayload
> {
	route = 'wards'
}
