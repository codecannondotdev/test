import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ExpenseModel } from '@/models/Expense/Model'

export interface VendorStorePayload {
	name: string
	contact_info?: string
	address?: string
	default_payment_terms?: string
}

export interface VendorUpdatePayload {
	name?: string
	contact_info?: string
	address?: string
	default_payment_terms?: string
}

export interface VendorModel extends Model {
	id: Column<string | number>
	name: Column<string>
	contact_info?: Column<string>
	address?: Column<string>
	default_payment_terms?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	expenses?: Relation<ExpenseModel>
}

export type Vendor = Plain<VendorModel>

export const title: keyof Vendor = 'name'
