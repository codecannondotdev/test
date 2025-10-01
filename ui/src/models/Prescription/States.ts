import type { PrescriptionModel } from '@/models/Prescription/Model'
import PrescriptionsApi from '@/models/Prescription/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class PrescriptionDetailsState extends DetailsState<PrescriptionsApi, PrescriptionModel> {
	api = new PrescriptionsApi()
}

export function usePrescriptionDetailsState() {
	return new PrescriptionDetailsState()
}

export class PrescriptionListState extends ListState<
	PrescriptionsApi,
	PrescriptionModel,
	LaravelPaginationResponse<PrescriptionModel>
> {
	api = new PrescriptionsApi()
}

export function usePrescriptionListState() {
	return new PrescriptionListState()
}
