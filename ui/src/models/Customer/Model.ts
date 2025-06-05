import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SalesOrderModel } from '@/models/SalesOrder/Model'

export interface CustomerStorePayload {
	company_name: string
	contact_person: string
	contact_email: string
	billing_address: string
}

export interface CustomerUpdatePayload {
	company_name?: string
	contact_person?: string
	contact_email?: string
	billing_address?: string
}

export interface CustomerModel extends Model {
	id: Column<string | number>
	company_name: Column<string>
	contact_person: Column<string>
	contact_email: Column<string>
	billing_address: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	salesOrders?: Relation<SalesOrderModel>
}

export type Customer = Plain<CustomerModel>

export const title: keyof Customer = 'company_name'
