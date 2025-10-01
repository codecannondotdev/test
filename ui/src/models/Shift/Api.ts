import type { ShiftModel, ShiftStorePayload, ShiftUpdatePayload } from '@/models/Shift/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ShiftsApi extends Api<
	ShiftModel,
	LaravelPaginationResponse<ShiftModel>,
	ShiftStorePayload,
	ShiftUpdatePayload
> {
	route = 'shifts'
}
