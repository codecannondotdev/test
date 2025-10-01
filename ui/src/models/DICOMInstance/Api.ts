import type {
	DICOMInstanceModel,
	DICOMInstanceStorePayload,
	DICOMInstanceUpdatePayload,
} from '@/models/DICOMInstance/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DICOMInstancesApi extends Api<
	DICOMInstanceModel,
	LaravelPaginationResponse<DICOMInstanceModel>,
	DICOMInstanceStorePayload,
	DICOMInstanceUpdatePayload
> {
	route = 'dicom-instances'
}
