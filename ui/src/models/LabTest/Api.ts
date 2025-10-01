import type {
	LabTestModel,
	LabTestStorePayload,
	LabTestUpdatePayload,
} from '@/models/LabTest/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class LabTestsApi extends Api<
	LabTestModel,
	LaravelPaginationResponse<LabTestModel>,
	LabTestStorePayload,
	LabTestUpdatePayload
> {
	route = 'lab-tests'
}
