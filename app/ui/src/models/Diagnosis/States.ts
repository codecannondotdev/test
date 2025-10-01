import type { DiagnosisModel } from '@/models/Diagnosis/Model'
import DiagnosissApi from '@/models/Diagnosis/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DiagnosisDetailsState extends DetailsState<DiagnosissApi, DiagnosisModel> {
	api = new DiagnosissApi()
}

export function useDiagnosisDetailsState() {
	return new DiagnosisDetailsState()
}

export class DiagnosisListState extends ListState<
	DiagnosissApi,
	DiagnosisModel,
	LaravelPaginationResponse<DiagnosisModel>
> {
	api = new DiagnosissApi()
}

export function useDiagnosisListState() {
	return new DiagnosisListState()
}
