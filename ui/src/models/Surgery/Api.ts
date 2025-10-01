import type {
	SurgeryModel,
	SurgeryStorePayload,
	SurgeryUpdatePayload,
} from '@/models/Surgery/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SurgerysApi extends Api<
	SurgeryModel,
	LaravelPaginationResponse<SurgeryModel>,
	SurgeryStorePayload,
	SurgeryUpdatePayload
> {
	route = 'surgeries'
}
