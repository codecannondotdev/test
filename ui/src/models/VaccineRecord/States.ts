import type { VaccineRecordModel } from '@/models/VaccineRecord/Model'
import VaccineRecordsApi from '@/models/VaccineRecord/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class VaccineRecordDetailsState extends DetailsState<VaccineRecordsApi, VaccineRecordModel> {
	api = new VaccineRecordsApi()
}

export function useVaccineRecordDetailsState() {
	return new VaccineRecordDetailsState()
}

export class VaccineRecordListState extends ListState<
	VaccineRecordsApi,
	VaccineRecordModel,
	LaravelPaginationResponse<VaccineRecordModel>
> {
	api = new VaccineRecordsApi()
}

export function useVaccineRecordListState() {
	return new VaccineRecordListState()
}
