import type {
	DiagnosisModel,
	DiagnosisStorePayload,
	DiagnosisUpdatePayload,
} from '@/models/Diagnosis/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DiagnosissApi extends Api<
	DiagnosisModel,
	LaravelPaginationResponse<DiagnosisModel>,
	DiagnosisStorePayload,
	DiagnosisUpdatePayload
> {
	route = 'diagnoses'
}
