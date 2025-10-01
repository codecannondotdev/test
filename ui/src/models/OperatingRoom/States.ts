import type { OperatingRoomModel } from '@/models/OperatingRoom/Model'
import OperatingRoomsApi from '@/models/OperatingRoom/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class OperatingRoomDetailsState extends DetailsState<OperatingRoomsApi, OperatingRoomModel> {
	api = new OperatingRoomsApi()
}

export function useOperatingRoomDetailsState() {
	return new OperatingRoomDetailsState()
}

export class OperatingRoomListState extends ListState<
	OperatingRoomsApi,
	OperatingRoomModel,
	LaravelPaginationResponse<OperatingRoomModel>
> {
	api = new OperatingRoomsApi()
}

export function useOperatingRoomListState() {
	return new OperatingRoomListState()
}
