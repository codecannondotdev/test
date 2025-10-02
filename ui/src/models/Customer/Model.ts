import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { OrderModel } from '@/models/Order/Model'
import type { PaymentModel } from '@/models/Payment/Model'
import type { ReturnModelModel } from '@/models/ReturnModel/Model'

export interface CustomerStorePayload {
	first_name: string
	last_name: string
	email: string
	phone_number?: string
}

export interface CustomerUpdatePayload {
	first_name?: string
	last_name?: string
	email?: string
	phone_number?: string
}

export interface CustomerModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	email: Column<string>
	phone_number?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	orders?: Relation<OrderModel>
	payments?: Relation<PaymentModel>
	returns?: Relation<ReturnModelModel>
}

export type Customer = Plain<CustomerModel>

export const title: keyof Customer = 'first_name'
