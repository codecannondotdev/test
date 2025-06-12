import type { BookingModel } from '@/models/Booking/Model'
import BookingsApi from '@/models/Booking/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class BookingDetailsState extends DetailsState<BookingsApi, BookingModel> {
	api = new BookingsApi()
}

export function useBookingDetailsState() {
	return new BookingDetailsState()
}

export class BookingListState extends ListState<
	BookingsApi,
	BookingModel,
	LaravelPaginationResponse<BookingModel>
> {
	api = new BookingsApi()
}

export function useBookingListState() {
	return new BookingListState()
}
