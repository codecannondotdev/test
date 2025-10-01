import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { BillingAccountModel } from '@/models/BillingAccount/Model'
import type { InvoiceModel } from '@/models/Invoice/Model'
import type { PaymentMethodModel } from '@/models/PaymentMethod/Model'
import type { FinancialTransactionModel } from '@/models/FinancialTransaction/Model'
import type { CurrencyModel } from '@/models/Currency/Model'

export interface PaymentStorePayload {
	amount: number
	date: string
	method?: 'Cash' | 'Card' | 'Check' | 'Insurance' | 'Online'
	reference?: string
	billing_account_id?: number
	invoice_id?: number
	payment_method_id?: number
	currency_id?: number
}

export interface PaymentUpdatePayload {
	amount?: number
	date?: string
	method?: 'Cash' | 'Card' | 'Check' | 'Insurance' | 'Online'
	reference?: string
	billing_account_id?: number
	invoice_id?: number
	payment_method_id?: number
	currency_id?: number
}

export interface PaymentModel extends Model {
	id: Column<string | number>
	amount: Column<number>
	date: Column<string>
	method?: Column<'Cash' | 'Card' | 'Check' | 'Insurance' | 'Online'>
	reference?: Column<string>
	billing_account_id?: Column<number>
	invoice_id?: Column<number>
	payment_method_id?: Column<number>
	currency_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	billingAccount?: Relation<BillingAccountModel>
	invoice?: Relation<InvoiceModel>
	paymentMethod?: Relation<PaymentMethodModel>
	financialTransaction?: Relation<FinancialTransactionModel>
	currency?: Relation<CurrencyModel>
}

export type Payment = Plain<PaymentModel>

export const title: keyof Payment = 'date'
