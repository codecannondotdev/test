import type {
	EmployeeModel,
	EmployeeStorePayload,
	EmployeeUpdatePayload,
} from '@/models/Employee/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class EmployeesApi extends Api<
	EmployeeModel,
	LaravelPaginationResponse<EmployeeModel>,
	EmployeeStorePayload,
	EmployeeUpdatePayload
> {
	route = 'employees'
}
