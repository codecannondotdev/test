import type { FamilyContactModel } from '@/models/FamilyContact/Model'
import FamilyContactsApi from '@/models/FamilyContact/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class FamilyContactDetailsState extends DetailsState<FamilyContactsApi, FamilyContactModel> {
	api = new FamilyContactsApi()
}

export function useFamilyContactDetailsState() {
	return new FamilyContactDetailsState()
}

export class FamilyContactListState extends ListState<
	FamilyContactsApi,
	FamilyContactModel,
	LaravelPaginationResponse<FamilyContactModel>
> {
	api = new FamilyContactsApi()
}

export function useFamilyContactListState() {
	return new FamilyContactListState()
}
