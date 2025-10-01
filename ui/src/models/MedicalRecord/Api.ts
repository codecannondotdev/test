import type {
	MedicalRecordModel,
	MedicalRecordStorePayload,
	MedicalRecordUpdatePayload,
} from '@/models/MedicalRecord/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MedicalRecordsApi extends Api<
	MedicalRecordModel,
	LaravelPaginationResponse<MedicalRecordModel>,
	MedicalRecordStorePayload,
	MedicalRecordUpdatePayload
> {
	route = 'medical-records'
}
