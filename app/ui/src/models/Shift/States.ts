import type { ShiftModel } from '@/models/Shift/Model'
import ShiftsApi from '@/models/Shift/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ShiftDetailsState extends DetailsState<ShiftsApi, ShiftModel> {
	api = new ShiftsApi()
}

export function useShiftDetailsState() {
	return new ShiftDetailsState()
}

export class ShiftListState extends ListState<
	ShiftsApi,
	ShiftModel,
	LaravelPaginationResponse<ShiftModel>
> {
	api = new ShiftsApi()
}

export function useShiftListState() {
	return new ShiftListState()
}
