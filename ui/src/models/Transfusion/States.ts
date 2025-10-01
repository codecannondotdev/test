import type { TransfusionModel } from '@/models/Transfusion/Model'
import TransfusionsApi from '@/models/Transfusion/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TransfusionDetailsState extends DetailsState<TransfusionsApi, TransfusionModel> {
	api = new TransfusionsApi()
}

export function useTransfusionDetailsState() {
	return new TransfusionDetailsState()
}

export class TransfusionListState extends ListState<
	TransfusionsApi,
	TransfusionModel,
	LaravelPaginationResponse<TransfusionModel>
> {
	api = new TransfusionsApi()
}

export function useTransfusionListState() {
	return new TransfusionListState()
}
