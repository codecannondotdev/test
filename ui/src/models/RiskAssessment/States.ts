import type { RiskAssessmentModel } from '@/models/RiskAssessment/Model'
import RiskAssessmentsApi from '@/models/RiskAssessment/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class RiskAssessmentDetailsState extends DetailsState<
	RiskAssessmentsApi,
	RiskAssessmentModel
> {
	api = new RiskAssessmentsApi()
}

export function useRiskAssessmentDetailsState() {
	return new RiskAssessmentDetailsState()
}

export class RiskAssessmentListState extends ListState<
	RiskAssessmentsApi,
	RiskAssessmentModel,
	LaravelPaginationResponse<RiskAssessmentModel>
> {
	api = new RiskAssessmentsApi()
}

export function useRiskAssessmentListState() {
	return new RiskAssessmentListState()
}
