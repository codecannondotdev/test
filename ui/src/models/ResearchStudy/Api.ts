import type {
	ResearchStudyModel,
	ResearchStudyStorePayload,
	ResearchStudyUpdatePayload,
} from '@/models/ResearchStudy/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ResearchStudysApi extends Api<
	ResearchStudyModel,
	LaravelPaginationResponse<ResearchStudyModel>,
	ResearchStudyStorePayload,
	ResearchStudyUpdatePayload
> {
	route = 'research-studies'
}
