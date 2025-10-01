import type {
	OperatingRoomModel,
	OperatingRoomStorePayload,
	OperatingRoomUpdatePayload,
} from '@/models/OperatingRoom/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class OperatingRoomsApi extends Api<
	OperatingRoomModel,
	LaravelPaginationResponse<OperatingRoomModel>,
	OperatingRoomStorePayload,
	OperatingRoomUpdatePayload
> {
	route = 'operating-rooms'
}
