import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { BillingItemModel } from '@/models/BillingItem/Model'
import type { InvoiceModel } from '@/models/Invoice/Model'

export interface TaxRateStorePayload {
	name: string
	rate: number
	description?: string
}

export interface TaxRateUpdatePayload {
	name?: string
	rate?: number
	description?: string
}

export interface TaxRateModel extends Model {
	id: Column<string | number>
	name: Column<string>
	rate: Column<number>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	billingItems?: Relation<BillingItemModel>
	invoices?: Relation<InvoiceModel>
}

export type TaxRate = Plain<TaxRateModel>

export const title: keyof TaxRate = 'name'
