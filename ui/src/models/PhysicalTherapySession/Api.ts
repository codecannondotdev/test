import type {
	PhysicalTherapySessionModel,
	PhysicalTherapySessionStorePayload,
	PhysicalTherapySessionUpdatePayload,
} from '@/models/PhysicalTherapySession/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PhysicalTherapySessionsApi extends Api<
	PhysicalTherapySessionModel,
	LaravelPaginationResponse<PhysicalTherapySessionModel>,
	PhysicalTherapySessionStorePayload,
	PhysicalTherapySessionUpdatePayload
> {
	route = 'physical-therapy-sessions'
}
