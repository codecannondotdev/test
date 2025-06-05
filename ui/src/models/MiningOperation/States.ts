import type { MiningOperationModel } from '@/models/MiningOperation/Model'
import MiningOperationsApi from '@/models/MiningOperation/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MiningOperationDetailsState extends DetailsState<
	MiningOperationsApi,
	MiningOperationModel
> {
	api = new MiningOperationsApi()
}

export function useMiningOperationDetailsState() {
	return new MiningOperationDetailsState()
}

export class MiningOperationListState extends ListState<
	MiningOperationsApi,
	MiningOperationModel,
	LaravelPaginationResponse<MiningOperationModel>
> {
	api = new MiningOperationsApi()
}

export function useMiningOperationListState() {
	return new MiningOperationListState()
}
