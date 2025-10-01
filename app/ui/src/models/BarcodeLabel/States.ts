import type { BarcodeLabelModel } from '@/models/BarcodeLabel/Model'
import BarcodeLabelsApi from '@/models/BarcodeLabel/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BarcodeLabelDetailsState extends DetailsState<BarcodeLabelsApi, BarcodeLabelModel> {
	api = new BarcodeLabelsApi()
}

export function useBarcodeLabelDetailsState() {
	return new BarcodeLabelDetailsState()
}

export class BarcodeLabelListState extends ListState<
	BarcodeLabelsApi,
	BarcodeLabelModel,
	LaravelPaginationResponse<BarcodeLabelModel>
> {
	api = new BarcodeLabelsApi()
}

export function useBarcodeLabelListState() {
	return new BarcodeLabelListState()
}
