import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { BillingModel } from '@/models/Billing/Model'

export interface PatientStorePayload {
	first_name: string
	last_name: string
	date_of_birth: string
	gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say'
	contact_number: string
	email?: string
	address?: string
	insurance_provider?: string
	insurance_policy_number?: string
	medical_history?: string
	emergency_contact_name?: string
	emergency_contact_phone?: string
}

export interface PatientUpdatePayload {
	first_name?: string
	last_name?: string
	date_of_birth?: string
	gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say'
	contact_number?: string
	email?: string
	address?: string
	insurance_provider?: string
	insurance_policy_number?: string
	medical_history?: string
	emergency_contact_name?: string
	emergency_contact_phone?: string
}

export interface PatientModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	date_of_birth: Column<string>
	gender?: Column<'Male' | 'Female' | 'Other' | 'Prefer not to say'>
	contact_number: Column<string>
	email?: Column<string>
	address?: Column<string>
	insurance_provider?: Column<string>
	insurance_policy_number?: Column<string>
	medical_history?: Column<string>
	emergency_contact_name?: Column<string>
	emergency_contact_phone?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	appointments?: Relation<AppointmentModel>
	treatments?: Relation<TreatmentModel>
	billings?: Relation<BillingModel>
}

export type Patient = Plain<PatientModel>

export const title: keyof Patient = 'first_name'
