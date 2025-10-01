import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { InvoiceModel } from '@/models/Invoice/Model'
import type { PaymentModel } from '@/models/Payment/Model'

export interface CurrencyStorePayload {
	code: string
	symbol?: string
	name?: string
}

export interface CurrencyUpdatePayload {
	code?: string
	symbol?: string
	name?: string
}

export interface CurrencyModel extends Model {
	id: Column<string | number>
	code: Column<string>
	symbol?: Column<string>
	name?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	invoices?: Relation<InvoiceModel>
	payments?: Relation<PaymentModel>
}

export type Currency = Plain<CurrencyModel>

export const title: keyof Currency = 'code'
