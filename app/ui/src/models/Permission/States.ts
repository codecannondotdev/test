import type { PermissionModel } from '@/models/Permission/Model'
import PermissionsApi from '@/models/Permission/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PermissionDetailsState extends DetailsState<PermissionsApi, PermissionModel> {
	api = new PermissionsApi()
}

export function usePermissionDetailsState() {
	return new PermissionDetailsState()
}

export class PermissionListState extends ListState<
	PermissionsApi,
	PermissionModel,
	LaravelPaginationResponse<PermissionModel>
> {
	api = new PermissionsApi()
}

export function usePermissionListState() {
	return new PermissionListState()
}
