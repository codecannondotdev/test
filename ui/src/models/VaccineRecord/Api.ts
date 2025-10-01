import type {
	VaccineRecordModel,
	VaccineRecordStorePayload,
	VaccineRecordUpdatePayload,
} from '@/models/VaccineRecord/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class VaccineRecordsApi extends Api<
	VaccineRecordModel,
	LaravelPaginationResponse<VaccineRecordModel>,
	VaccineRecordStorePayload,
	VaccineRecordUpdatePayload
> {
	route = 'vaccine-records'
}
