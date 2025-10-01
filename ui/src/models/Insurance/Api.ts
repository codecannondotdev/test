import type {
	InsuranceModel,
	InsuranceStorePayload,
	InsuranceUpdatePayload,
} from '@/models/Insurance/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class InsurancesApi extends Api<
	InsuranceModel,
	LaravelPaginationResponse<InsuranceModel>,
	InsuranceStorePayload,
	InsuranceUpdatePayload
> {
	route = 'insurances'
}
