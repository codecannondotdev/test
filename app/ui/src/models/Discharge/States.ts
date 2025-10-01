import type { DischargeModel } from '@/models/Discharge/Model'
import DischargesApi from '@/models/Discharge/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DischargeDetailsState extends DetailsState<DischargesApi, DischargeModel> {
	api = new DischargesApi()
}

export function useDischargeDetailsState() {
	return new DischargeDetailsState()
}

export class DischargeListState extends ListState<
	DischargesApi,
	DischargeModel,
	LaravelPaginationResponse<DischargeModel>
> {
	api = new DischargesApi()
}

export function useDischargeListState() {
	return new DischargeListState()
}
