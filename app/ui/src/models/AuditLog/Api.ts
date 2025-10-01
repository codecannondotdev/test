import type {
	AuditLogModel,
	AuditLogStorePayload,
	AuditLogUpdatePayload,
} from '@/models/AuditLog/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AuditLogsApi extends Api<
	AuditLogModel,
	LaravelPaginationResponse<AuditLogModel>,
	AuditLogStorePayload,
	AuditLogUpdatePayload
> {
	route = 'audit-logs'
}
