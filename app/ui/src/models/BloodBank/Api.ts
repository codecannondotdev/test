import type {
	BloodBankModel,
	BloodBankStorePayload,
	BloodBankUpdatePayload,
} from '@/models/BloodBank/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BloodBanksApi extends Api<
	BloodBankModel,
	LaravelPaginationResponse<BloodBankModel>,
	BloodBankStorePayload,
	BloodBankUpdatePayload
> {
	route = 'blood-banks'
}
