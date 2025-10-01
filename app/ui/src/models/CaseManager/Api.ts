import type {
	CaseManagerModel,
	CaseManagerStorePayload,
	CaseManagerUpdatePayload,
} from '@/models/CaseManager/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CaseManagersApi extends Api<
	CaseManagerModel,
	LaravelPaginationResponse<CaseManagerModel>,
	CaseManagerStorePayload,
	CaseManagerUpdatePayload
> {
	route = 'case-managers'
}
