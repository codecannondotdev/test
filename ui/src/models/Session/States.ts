import type { SessionModel } from '@/models/Session/Model'
import SessionsApi from '@/models/Session/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SessionDetailsState extends DetailsState<SessionsApi, SessionModel> {
	api = new SessionsApi()
}

export function useSessionDetailsState() {
	return new SessionDetailsState()
}

export class SessionListState extends ListState<
	SessionsApi,
	SessionModel,
	LaravelPaginationResponse<SessionModel>
> {
	api = new SessionsApi()
}

export function useSessionListState() {
	return new SessionListState()
}
