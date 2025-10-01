import type { ConsentModel } from '@/models/Consent/Model'
import ConsentsApi from '@/models/Consent/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ConsentDetailsState extends DetailsState<ConsentsApi, ConsentModel> {
	api = new ConsentsApi()
}

export function useConsentDetailsState() {
	return new ConsentDetailsState()
}

export class ConsentListState extends ListState<
	ConsentsApi,
	ConsentModel,
	LaravelPaginationResponse<ConsentModel>
> {
	api = new ConsentsApi()
}

export function useConsentListState() {
	return new ConsentListState()
}
