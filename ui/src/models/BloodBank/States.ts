import type { BloodBankModel } from '@/models/BloodBank/Model'
import BloodBanksApi from '@/models/BloodBank/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BloodBankDetailsState extends DetailsState<BloodBanksApi, BloodBankModel> {
	api = new BloodBanksApi()
}

export function useBloodBankDetailsState() {
	return new BloodBankDetailsState()
}

export class BloodBankListState extends ListState<
	BloodBanksApi,
	BloodBankModel,
	LaravelPaginationResponse<BloodBankModel>
> {
	api = new BloodBanksApi()
}

export function useBloodBankListState() {
	return new BloodBankListState()
}
