import type { MineModel } from '@/models/Mine/Model'
import MinesApi from '@/models/Mine/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MineDetailsState extends DetailsState<MinesApi, MineModel> {
	api = new MinesApi()
}

export function useMineDetailsState() {
	return new MineDetailsState()
}

export class MineListState extends ListState<
	MinesApi,
	MineModel,
	LaravelPaginationResponse<MineModel>
> {
	api = new MinesApi()
}

export function useMineListState() {
	return new MineListState()
}
