import type { ProgramModel } from '@/models/Program/Model'
import ProgramsApi from '@/models/Program/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ProgramDetailsState extends DetailsState<ProgramsApi, ProgramModel> {
	api = new ProgramsApi()
}

export function useProgramDetailsState() {
	return new ProgramDetailsState()
}

export class ProgramListState extends ListState<
	ProgramsApi,
	ProgramModel,
	LaravelPaginationResponse<ProgramModel>
> {
	api = new ProgramsApi()
}

export function useProgramListState() {
	return new ProgramListState()
}
