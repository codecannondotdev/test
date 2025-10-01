import type { ReferralSourceModel } from '@/models/ReferralSource/Model'
import ReferralSourcesApi from '@/models/ReferralSource/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ReferralSourceDetailsState extends DetailsState<
	ReferralSourcesApi,
	ReferralSourceModel
> {
	api = new ReferralSourcesApi()
}

export function useReferralSourceDetailsState() {
	return new ReferralSourceDetailsState()
}

export class ReferralSourceListState extends ListState<
	ReferralSourcesApi,
	ReferralSourceModel,
	LaravelPaginationResponse<ReferralSourceModel>
> {
	api = new ReferralSourcesApi()
}

export function useReferralSourceListState() {
	return new ReferralSourceListState()
}
