import type { TelemedicineSessionModel } from '@/models/TelemedicineSession/Model'
import TelemedicineSessionsApi from '@/models/TelemedicineSession/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TelemedicineSessionDetailsState extends DetailsState<
	TelemedicineSessionsApi,
	TelemedicineSessionModel
> {
	api = new TelemedicineSessionsApi()
}

export function useTelemedicineSessionDetailsState() {
	return new TelemedicineSessionDetailsState()
}

export class TelemedicineSessionListState extends ListState<
	TelemedicineSessionsApi,
	TelemedicineSessionModel,
	LaravelPaginationResponse<TelemedicineSessionModel>
> {
	api = new TelemedicineSessionsApi()
}

export function useTelemedicineSessionListState() {
	return new TelemedicineSessionListState()
}
