import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { InvoiceModel } from '@/models/Invoice/Model'
import type { PaymentModel } from '@/models/Payment/Model'
import type { InsuranceClaimModel } from '@/models/InsuranceClaim/Model'

export interface BillingAccountStorePayload {
	account_number: string
	status?: 'Active' | 'Closed' | 'Suspended'
	balance?: number
	patient_id?: number
}

export interface BillingAccountUpdatePayload {
	account_number?: string
	status?: 'Active' | 'Closed' | 'Suspended'
	balance?: number
	patient_id?: number
}

export interface BillingAccountModel extends Model {
	id: Column<string | number>
	account_number: Column<string>
	status?: Column<'Active' | 'Closed' | 'Suspended'>
	balance?: Column<number>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	invoices?: Relation<InvoiceModel>
	payments?: Relation<PaymentModel>
	insuranceClaims?: Relation<InsuranceClaimModel>
}

export type BillingAccount = Plain<BillingAccountModel>

export const title: keyof BillingAccount = 'account_number'
