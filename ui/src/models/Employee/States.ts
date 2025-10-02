import type { EmployeeModel } from '@/models/Employee/Model'
import EmployeesApi from '@/models/Employee/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class EmployeeDetailsState extends DetailsState<EmployeesApi, EmployeeModel> {
	api = new EmployeesApi()
}

export function useEmployeeDetailsState() {
	return new EmployeeDetailsState()
}

export class EmployeeListState extends ListState<
	EmployeesApi,
	EmployeeModel,
	LaravelPaginationResponse<EmployeeModel>
> {
	api = new EmployeesApi()
}

export function useEmployeeListState() {
	return new EmployeeListState()
}
