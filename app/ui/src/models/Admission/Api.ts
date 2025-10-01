import type {
	AdmissionModel,
	AdmissionStorePayload,
	AdmissionUpdatePayload,
} from '@/models/Admission/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AdmissionsApi extends Api<
	AdmissionModel,
	LaravelPaginationResponse<AdmissionModel>,
	AdmissionStorePayload,
	AdmissionUpdatePayload
> {
	route = 'admissions'
}
