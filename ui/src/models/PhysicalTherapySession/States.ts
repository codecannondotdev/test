import type { PhysicalTherapySessionModel } from '@/models/PhysicalTherapySession/Model'
import PhysicalTherapySessionsApi from '@/models/PhysicalTherapySession/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PhysicalTherapySessionDetailsState extends DetailsState<
	PhysicalTherapySessionsApi,
	PhysicalTherapySessionModel
> {
	api = new PhysicalTherapySessionsApi()
}

export function usePhysicalTherapySessionDetailsState() {
	return new PhysicalTherapySessionDetailsState()
}

export class PhysicalTherapySessionListState extends ListState<
	PhysicalTherapySessionsApi,
	PhysicalTherapySessionModel,
	LaravelPaginationResponse<PhysicalTherapySessionModel>
> {
	api = new PhysicalTherapySessionsApi()
}

export function usePhysicalTherapySessionListState() {
	return new PhysicalTherapySessionListState()
}
