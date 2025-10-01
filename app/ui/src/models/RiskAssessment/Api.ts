import type {
	RiskAssessmentModel,
	RiskAssessmentStorePayload,
	RiskAssessmentUpdatePayload,
} from '@/models/RiskAssessment/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class RiskAssessmentsApi extends Api<
	RiskAssessmentModel,
	LaravelPaginationResponse<RiskAssessmentModel>,
	RiskAssessmentStorePayload,
	RiskAssessmentUpdatePayload
> {
	route = 'risk-assessments'
}
