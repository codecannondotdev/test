import type { CareTeamModel } from '@/models/CareTeam/Model'
import CareTeamsApi from '@/models/CareTeam/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CareTeamDetailsState extends DetailsState<CareTeamsApi, CareTeamModel> {
	api = new CareTeamsApi()
}

export function useCareTeamDetailsState() {
	return new CareTeamDetailsState()
}

export class CareTeamListState extends ListState<
	CareTeamsApi,
	CareTeamModel,
	LaravelPaginationResponse<CareTeamModel>
> {
	api = new CareTeamsApi()
}

export function useCareTeamListState() {
	return new CareTeamListState()
}
