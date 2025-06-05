import type { MineModel, MineStorePayload, MineUpdatePayload } from '@/models/Mine/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MinesApi extends Api<
	MineModel,
	LaravelPaginationResponse<MineModel>,
	MineStorePayload,
	MineUpdatePayload
> {
	route = 'mines'
}
