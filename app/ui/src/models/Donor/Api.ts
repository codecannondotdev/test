import type { DonorModel, DonorStorePayload, DonorUpdatePayload } from '@/models/Donor/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DonorsApi extends Api<
	DonorModel,
	LaravelPaginationResponse<DonorModel>,
	DonorStorePayload,
	DonorUpdatePayload
> {
	route = 'donors'
}
