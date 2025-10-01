import type { StaffCredentialModel } from '@/models/StaffCredential/Model'
import StaffCredentialsApi from '@/models/StaffCredential/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class StaffCredentialDetailsState extends DetailsState<
	StaffCredentialsApi,
	StaffCredentialModel
> {
	api = new StaffCredentialsApi()
}

export function useStaffCredentialDetailsState() {
	return new StaffCredentialDetailsState()
}

export class StaffCredentialListState extends ListState<
	StaffCredentialsApi,
	StaffCredentialModel,
	LaravelPaginationResponse<StaffCredentialModel>
> {
	api = new StaffCredentialsApi()
}

export function useStaffCredentialListState() {
	return new StaffCredentialListState()
}
