import type {
	ClinicalTrialModel,
	ClinicalTrialStorePayload,
	ClinicalTrialUpdatePayload,
} from '@/models/ClinicalTrial/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ClinicalTrialsApi extends Api<
	ClinicalTrialModel,
	LaravelPaginationResponse<ClinicalTrialModel>,
	ClinicalTrialStorePayload,
	ClinicalTrialUpdatePayload
> {
	route = 'clinical-trials'
}
