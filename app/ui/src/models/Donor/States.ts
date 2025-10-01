import type { DonorModel } from '@/models/Donor/Model'
import DonorsApi from '@/models/Donor/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DonorDetailsState extends DetailsState<DonorsApi, DonorModel> {
	api = new DonorsApi()
}

export function useDonorDetailsState() {
	return new DonorDetailsState()
}

export class DonorListState extends ListState<
	DonorsApi,
	DonorModel,
	LaravelPaginationResponse<DonorModel>
> {
	api = new DonorsApi()
}

export function useDonorListState() {
	return new DonorListState()
}
