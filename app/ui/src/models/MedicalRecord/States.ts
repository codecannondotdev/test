import type { MedicalRecordModel } from '@/models/MedicalRecord/Model'
import MedicalRecordsApi from '@/models/MedicalRecord/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MedicalRecordDetailsState extends DetailsState<MedicalRecordsApi, MedicalRecordModel> {
	api = new MedicalRecordsApi()
}

export function useMedicalRecordDetailsState() {
	return new MedicalRecordDetailsState()
}

export class MedicalRecordListState extends ListState<
	MedicalRecordsApi,
	MedicalRecordModel,
	LaravelPaginationResponse<MedicalRecordModel>
> {
	api = new MedicalRecordsApi()
}

export function useMedicalRecordListState() {
	return new MedicalRecordListState()
}
