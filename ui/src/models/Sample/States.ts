import type { SampleModel } from '@/models/Sample/Model'
import SamplesApi from '@/models/Sample/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SampleDetailsState extends DetailsState<SamplesApi, SampleModel> {
	api = new SamplesApi()
}

export function useSampleDetailsState() {
	return new SampleDetailsState()
}

export class SampleListState extends ListState<
	SamplesApi,
	SampleModel,
	LaravelPaginationResponse<SampleModel>
> {
	api = new SamplesApi()
}

export function useSampleListState() {
	return new SampleListState()
}
