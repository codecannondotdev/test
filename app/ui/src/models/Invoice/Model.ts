import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { BillingAccountModel } from '@/models/BillingAccount/Model'
import type { BillingItemModel } from '@/models/BillingItem/Model'
import type { PaymentModel } from '@/models/Payment/Model'
import type { InsuranceClaimModel } from '@/models/InsuranceClaim/Model'
import type { CurrencyModel } from '@/models/Currency/Model'
import type { TaxRateModel } from '@/models/TaxRate/Model'

export interface InvoiceStorePayload {
	invoice_number: string
	issue_date: string
	due_date?: string
	total_amount: number
	status?: 'DRAFT' | 'ISSUED' | 'PAID' | 'PARTIALLY PAID' | 'VOIDED'
	billing_account_id?: number
	insurance_claim_id?: number
	currency_id?: number
	tax_rate_id?: number
}

export interface InvoiceUpdatePayload {
	invoice_number?: string
	issue_date?: string
	due_date?: string
	total_amount?: number
	status?: 'DRAFT' | 'ISSUED' | 'PAID' | 'PARTIALLY PAID' | 'VOIDED'
	billing_account_id?: number
	insurance_claim_id?: number
	currency_id?: number
	tax_rate_id?: number
}

export interface InvoiceModel extends Model {
	id: Column<string | number>
	invoice_number: Column<string>
	issue_date: Column<string>
	due_date?: Column<string>
	total_amount: Column<number>
	status?: Column<'DRAFT' | 'ISSUED' | 'PAID' | 'PARTIALLY PAID' | 'VOIDED'>
	billing_account_id?: Column<number>
	insurance_claim_id?: Column<number>
	currency_id?: Column<number>
	tax_rate_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	billingAccount?: Relation<BillingAccountModel>
	items?: Relation<BillingItemModel>
	payments?: Relation<PaymentModel>
	insuranceClaim?: Relation<InsuranceClaimModel>
	currency?: Relation<CurrencyModel>
	taxRate?: Relation<TaxRateModel>
}

export type Invoice = Plain<InvoiceModel>

export const title: keyof Invoice = 'invoice_number'
