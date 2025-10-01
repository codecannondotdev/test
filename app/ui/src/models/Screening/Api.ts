import type {
	ScreeningModel,
	ScreeningStorePayload,
	ScreeningUpdatePayload,
} from '@/models/Screening/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ScreeningsApi extends Api<
	ScreeningModel,
	LaravelPaginationResponse<ScreeningModel>,
	ScreeningStorePayload,
	ScreeningUpdatePayload
> {
	route = 'screenings'
}
