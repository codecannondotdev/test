import type {
	StaffCredentialModel,
	StaffCredentialStorePayload,
	StaffCredentialUpdatePayload,
} from '@/models/StaffCredential/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class StaffCredentialsApi extends Api<
	StaffCredentialModel,
	LaravelPaginationResponse<StaffCredentialModel>,
	StaffCredentialStorePayload,
	StaffCredentialUpdatePayload
> {
	route = 'staff-credentials'
}
