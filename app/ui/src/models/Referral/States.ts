import type { ReferralModel } from '@/models/Referral/Model'
import ReferralsApi from '@/models/Referral/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ReferralDetailsState extends DetailsState<ReferralsApi, ReferralModel> {
	api = new ReferralsApi()
}

export function useReferralDetailsState() {
	return new ReferralDetailsState()
}

export class ReferralListState extends ListState<
	ReferralsApi,
	ReferralModel,
	LaravelPaginationResponse<ReferralModel>
> {
	api = new ReferralsApi()
}

export function useReferralListState() {
	return new ReferralListState()
}
