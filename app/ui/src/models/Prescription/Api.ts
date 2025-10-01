import type {
	PrescriptionModel,
	PrescriptionStorePayload,
	PrescriptionUpdatePayload,
} from '@/models/Prescription/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class PrescriptionsApi extends Api<
	PrescriptionModel,
	LaravelPaginationResponse<PrescriptionModel>,
	PrescriptionStorePayload,
	PrescriptionUpdatePayload
> {
	route = 'prescriptions'
}
