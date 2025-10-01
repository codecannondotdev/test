import type { OccupationalTherapySessionModel } from '@/models/OccupationalTherapySession/Model'
import OccupationalTherapySessionsApi from '@/models/OccupationalTherapySession/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class OccupationalTherapySessionDetailsState extends DetailsState<
	OccupationalTherapySessionsApi,
	OccupationalTherapySessionModel
> {
	api = new OccupationalTherapySessionsApi()
}

export function useOccupationalTherapySessionDetailsState() {
	return new OccupationalTherapySessionDetailsState()
}

export class OccupationalTherapySessionListState extends ListState<
	OccupationalTherapySessionsApi,
	OccupationalTherapySessionModel,
	LaravelPaginationResponse<OccupationalTherapySessionModel>
> {
	api = new OccupationalTherapySessionsApi()
}

export function useOccupationalTherapySessionListState() {
	return new OccupationalTherapySessionListState()
}
