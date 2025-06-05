import type { CustomerModel } from '@/models/Customer/Model'
import CustomersApi from '@/models/Customer/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CustomerDetailsState extends DetailsState<CustomersApi, CustomerModel> {
	api = new CustomersApi()
}

export function useCustomerDetailsState() {
	return new CustomerDetailsState()
}

export class CustomerListState extends ListState<
	CustomersApi,
	CustomerModel,
	LaravelPaginationResponse<CustomerModel>
> {
	api = new CustomersApi()
}

export function useCustomerListState() {
	return new CustomerListState()
}
