import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { InvoiceModel } from '@/models/Invoice/Model'
import type { TaxRateModel } from '@/models/TaxRate/Model'

export interface BillingItemStorePayload {
	description: string
	quantity: number
	unit_price: number
	total_price?: number
	invoice_id?: number
	tax_rate_id?: number
}

export interface BillingItemUpdatePayload {
	description?: string
	quantity?: number
	unit_price?: number
	total_price?: number
	invoice_id?: number
	tax_rate_id?: number
}

export interface BillingItemModel extends Model {
	id: Column<string | number>
	description: Column<string>
	quantity: Column<number>
	unit_price: Column<number>
	total_price?: Column<number>
	invoice_id?: Column<number>
	tax_rate_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	invoice?: Relation<InvoiceModel>
	taxRate?: Relation<TaxRateModel>
}

export type BillingItem = Plain<BillingItemModel>

export const title: keyof BillingItem = 'description'
