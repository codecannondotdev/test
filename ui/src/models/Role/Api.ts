import type { RoleModel, RoleStorePayload, RoleUpdatePayload } from '@/models/Role/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class RolesApi extends Api<
	RoleModel,
	LaravelPaginationResponse<RoleModel>,
	RoleStorePayload,
	RoleUpdatePayload
> {
	route = 'roles'
}
