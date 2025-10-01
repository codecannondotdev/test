import type { RoomModel } from '@/models/Room/Model'
import RoomsApi from '@/models/Room/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class RoomDetailsState extends DetailsState<RoomsApi, RoomModel> {
	api = new RoomsApi()
}

export function useRoomDetailsState() {
	return new RoomDetailsState()
}

export class RoomListState extends ListState<
	RoomsApi,
	RoomModel,
	LaravelPaginationResponse<RoomModel>
> {
	api = new RoomsApi()
}

export function useRoomListState() {
	return new RoomListState()
}
