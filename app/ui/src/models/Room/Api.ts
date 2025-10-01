import type { RoomModel, RoomStorePayload, RoomUpdatePayload } from '@/models/Room/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class RoomsApi extends Api<
	RoomModel,
	LaravelPaginationResponse<RoomModel>,
	RoomStorePayload,
	RoomUpdatePayload
> {
	route = 'rooms'
}
