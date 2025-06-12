import type {
	SessionModel,
	SessionStorePayload,
	SessionUpdatePayload,
} from '@/models/Session/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SessionsApi extends Api<
	SessionModel,
	LaravelPaginationResponse<SessionModel>,
	SessionStorePayload,
	SessionUpdatePayload
> {
	route = 'sessions'
}
