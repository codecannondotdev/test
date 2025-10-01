import type { ConsentFormModel } from '@/models/ConsentForm/Model'
import ConsentFormsApi from '@/models/ConsentForm/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ConsentFormDetailsState extends DetailsState<ConsentFormsApi, ConsentFormModel> {
	api = new ConsentFormsApi()
}

export function useConsentFormDetailsState() {
	return new ConsentFormDetailsState()
}

export class ConsentFormListState extends ListState<
	ConsentFormsApi,
	ConsentFormModel,
	LaravelPaginationResponse<ConsentFormModel>
> {
	api = new ConsentFormsApi()
}

export function useConsentFormListState() {
	return new ConsentFormListState()
}
