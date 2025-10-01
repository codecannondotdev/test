import type {
	PermissionModel,
	PermissionStorePayload,
	PermissionUpdatePayload,
} from '@/models/Permission/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PermissionsApi extends Api<
	PermissionModel,
	LaravelPaginationResponse<PermissionModel>,
	PermissionStorePayload,
	PermissionUpdatePayload
> {
	route = 'permissions'
}
