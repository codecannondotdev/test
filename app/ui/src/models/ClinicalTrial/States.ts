import type { ClinicalTrialModel } from '@/models/ClinicalTrial/Model'
import ClinicalTrialsApi from '@/models/ClinicalTrial/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ClinicalTrialDetailsState extends DetailsState<ClinicalTrialsApi, ClinicalTrialModel> {
	api = new ClinicalTrialsApi()
}

export function useClinicalTrialDetailsState() {
	return new ClinicalTrialDetailsState()
}

export class ClinicalTrialListState extends ListState<
	ClinicalTrialsApi,
	ClinicalTrialModel,
	LaravelPaginationResponse<ClinicalTrialModel>
> {
	api = new ClinicalTrialsApi()
}

export function useClinicalTrialListState() {
	return new ClinicalTrialListState()
}
