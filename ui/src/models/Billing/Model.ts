import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { MedicationModel } from '@/models/Medication/Model'

export interface BillingStorePayload {
	invoice_number: string
	billing_date: string
	total_amount: number
	status: 'PENDING' | 'BILLED' | 'PAID' | 'PARTIALLY_PAID' | 'DENIED' | 'REFUNDED'
	payment_method?: 'CASH' | 'CARD' | 'INSURANCE' | 'ELECTRONIC_TRANSFER'
	insurance_claim_number?: string
	notes?: string
	patient_id?: number
}

export interface BillingUpdatePayload {
	invoice_number?: string
	billing_date?: string
	total_amount?: number
	status?: 'PENDING' | 'BILLED' | 'PAID' | 'PARTIALLY_PAID' | 'DENIED' | 'REFUNDED'
	payment_method?: 'CASH' | 'CARD' | 'INSURANCE' | 'ELECTRONIC_TRANSFER'
	insurance_claim_number?: string
	notes?: string
	patient_id?: number
}

export interface BillingModel extends Model {
	id: Column<string | number>
	invoice_number: Column<string>
	billing_date: Column<string>
	total_amount: Column<number>
	status: Column<'PENDING' | 'BILLED' | 'PAID' | 'PARTIALLY_PAID' | 'DENIED' | 'REFUNDED'>
	payment_method?: Column<'CASH' | 'CARD' | 'INSURANCE' | 'ELECTRONIC_TRANSFER'>
	insurance_claim_number?: Column<string>
	notes?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	treatments?: Relation<TreatmentModel>
	medications?: Relation<MedicationModel>
}

export type Billing = Plain<BillingModel>

export const title: keyof Billing = 'invoice_number'
