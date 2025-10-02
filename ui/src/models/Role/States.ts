import type { RoleModel } from '@/models/Role/Model'
import RolesApi from '@/models/Role/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class RoleDetailsState extends DetailsState<RolesApi, RoleModel> {
	api = new RolesApi()
}

export function useRoleDetailsState() {
	return new RoleDetailsState()
}

export class RoleListState extends ListState<
	RolesApi,
	RoleModel,
	LaravelPaginationResponse<RoleModel>
> {
	api = new RolesApi()
}

export function useRoleListState() {
	return new RoleListState()
}
