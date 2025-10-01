import type { VitalSignModel } from '@/models/VitalSign/Model'
import VitalSignsApi from '@/models/VitalSign/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class VitalSignDetailsState extends DetailsState<VitalSignsApi, VitalSignModel> {
	api = new VitalSignsApi()
}

export function useVitalSignDetailsState() {
	return new VitalSignDetailsState()
}

export class VitalSignListState extends ListState<
	VitalSignsApi,
	VitalSignModel,
	LaravelPaginationResponse<VitalSignModel>
> {
	api = new VitalSignsApi()
}

export function useVitalSignListState() {
	return new VitalSignListState()
}
