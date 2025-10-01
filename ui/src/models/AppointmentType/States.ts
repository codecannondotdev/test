import type { AppointmentTypeModel } from '@/models/AppointmentType/Model'
import AppointmentTypesApi from '@/models/AppointmentType/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AppointmentTypeDetailsState extends DetailsState<
	AppointmentTypesApi,
	AppointmentTypeModel
> {
	api = new AppointmentTypesApi()
}

export function useAppointmentTypeDetailsState() {
	return new AppointmentTypeDetailsState()
}

export class AppointmentTypeListState extends ListState<
	AppointmentTypesApi,
	AppointmentTypeModel,
	LaravelPaginationResponse<AppointmentTypeModel>
> {
	api = new AppointmentTypesApi()
}

export function useAppointmentTypeListState() {
	return new AppointmentTypeListState()
}
