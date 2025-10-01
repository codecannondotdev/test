import type {
	TelemedicineSessionModel,
	TelemedicineSessionStorePayload,
	TelemedicineSessionUpdatePayload,
} from '@/models/TelemedicineSession/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TelemedicineSessionsApi extends Api<
	TelemedicineSessionModel,
	LaravelPaginationResponse<TelemedicineSessionModel>,
	TelemedicineSessionStorePayload,
	TelemedicineSessionUpdatePayload
> {
	route = 'telemedicine-sessions'
}
