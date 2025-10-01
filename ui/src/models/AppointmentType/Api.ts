import type {
	AppointmentTypeModel,
	AppointmentTypeStorePayload,
	AppointmentTypeUpdatePayload,
} from '@/models/AppointmentType/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class AppointmentTypesApi extends Api<
	AppointmentTypeModel,
	LaravelPaginationResponse<AppointmentTypeModel>,
	AppointmentTypeStorePayload,
	AppointmentTypeUpdatePayload
> {
	route = 'appointment-types'
}
