import type { ProcedureModel } from '@/models/Procedure/Model'
import ProceduresApi from '@/models/Procedure/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ProcedureDetailsState extends DetailsState<ProceduresApi, ProcedureModel> {
	api = new ProceduresApi()
}

export function useProcedureDetailsState() {
	return new ProcedureDetailsState()
}

export class ProcedureListState extends ListState<
	ProceduresApi,
	ProcedureModel,
	LaravelPaginationResponse<ProcedureModel>
> {
	api = new ProceduresApi()
}

export function useProcedureListState() {
	return new ProcedureListState()
}
