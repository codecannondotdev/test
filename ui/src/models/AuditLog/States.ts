import type { AuditLogModel } from '@/models/AuditLog/Model'
import AuditLogsApi from '@/models/AuditLog/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AuditLogDetailsState extends DetailsState<AuditLogsApi, AuditLogModel> {
	api = new AuditLogsApi()
}

export function useAuditLogDetailsState() {
	return new AuditLogDetailsState()
}

export class AuditLogListState extends ListState<
	AuditLogsApi,
	AuditLogModel,
	LaravelPaginationResponse<AuditLogModel>
> {
	api = new AuditLogsApi()
}

export function useAuditLogListState() {
	return new AuditLogListState()
}
