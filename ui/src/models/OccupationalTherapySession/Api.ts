import type {
	OccupationalTherapySessionModel,
	OccupationalTherapySessionStorePayload,
	OccupationalTherapySessionUpdatePayload,
} from '@/models/OccupationalTherapySession/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class OccupationalTherapySessionsApi extends Api<
	OccupationalTherapySessionModel,
	LaravelPaginationResponse<OccupationalTherapySessionModel>,
	OccupationalTherapySessionStorePayload,
	OccupationalTherapySessionUpdatePayload
> {
	route = 'occupational-therapy-sessions'
}
