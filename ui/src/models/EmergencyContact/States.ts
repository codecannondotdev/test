import type { EmergencyContactModel } from '@/models/EmergencyContact/Model'
import EmergencyContactsApi from '@/models/EmergencyContact/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class EmergencyContactDetailsState extends DetailsState<
	EmergencyContactsApi,
	EmergencyContactModel
> {
	api = new EmergencyContactsApi()
}

export function useEmergencyContactDetailsState() {
	return new EmergencyContactDetailsState()
}

export class EmergencyContactListState extends ListState<
	EmergencyContactsApi,
	EmergencyContactModel,
	LaravelPaginationResponse<EmergencyContactModel>
> {
	api = new EmergencyContactsApi()
}

export function useEmergencyContactListState() {
	return new EmergencyContactListState()
}
