import type {
	StaffRoleModel,
	StaffRoleStorePayload,
	StaffRoleUpdatePayload,
} from '@/models/StaffRole/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class StaffRolesApi extends Api<
	StaffRoleModel,
	LaravelPaginationResponse<StaffRoleModel>,
	StaffRoleStorePayload,
	StaffRoleUpdatePayload
> {
	route = 'staff-roles'
}
