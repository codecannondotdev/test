import type {
	ImagingStudyModel,
	ImagingStudyStorePayload,
	ImagingStudyUpdatePayload,
} from '@/models/ImagingStudy/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ImagingStudysApi extends Api<
	ImagingStudyModel,
	LaravelPaginationResponse<ImagingStudyModel>,
	ImagingStudyStorePayload,
	ImagingStudyUpdatePayload
> {
	route = 'imaging-studies'
}
