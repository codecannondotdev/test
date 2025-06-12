import type {
	BookingModel,
	BookingStorePayload,
	BookingUpdatePayload,
} from '@/models/Booking/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class BookingsApi extends Api<
	BookingModel,
	LaravelPaginationResponse<BookingModel>,
	BookingStorePayload,
	BookingUpdatePayload
> {
	route = 'bookings'
}
