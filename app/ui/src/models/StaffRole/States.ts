import type { StaffRoleModel } from '@/models/StaffRole/Model'
import StaffRolesApi from '@/models/StaffRole/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class StaffRoleDetailsState extends DetailsState<StaffRolesApi, StaffRoleModel> {
	api = new StaffRolesApi()
}

export function useStaffRoleDetailsState() {
	return new StaffRoleDetailsState()
}

export class StaffRoleListState extends ListState<
	StaffRolesApi,
	StaffRoleModel,
	LaravelPaginationResponse<StaffRoleModel>
> {
	api = new StaffRolesApi()
}

export function useStaffRoleListState() {
	return new StaffRoleListState()
}
