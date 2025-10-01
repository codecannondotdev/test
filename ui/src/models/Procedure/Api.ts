import type {
	ProcedureModel,
	ProcedureStorePayload,
	ProcedureUpdatePayload,
} from '@/models/Procedure/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ProceduresApi extends Api<
	ProcedureModel,
	LaravelPaginationResponse<ProcedureModel>,
	ProcedureStorePayload,
	ProcedureUpdatePayload
> {
	route = 'procedures'
}
