import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { MedicationModel } from '@/models/Medication/Model'
import type { BillingModel } from '@/models/Billing/Model'

export interface TreatmentStorePayload {
	title: string
	description?: string
	start_date?: string
	end_date?: string
	outcome?: 'ONGOING' | 'RESOLVED' | 'IMPROVED' | 'NO CHANGE' | 'WORSENED'
	notes?: string
	patient_id?: number
	doctor_id?: number
	appointment_id?: number
}

export interface TreatmentUpdatePayload {
	title?: string
	description?: string
	start_date?: string
	end_date?: string
	outcome?: 'ONGOING' | 'RESOLVED' | 'IMPROVED' | 'NO CHANGE' | 'WORSENED'
	notes?: string
	patient_id?: number
	doctor_id?: number
	appointment_id?: number
}

export interface TreatmentModel extends Model {
	id: Column<string | number>
	title: Column<string>
	description?: Column<string>
	start_date?: Column<string>
	end_date?: Column<string>
	outcome?: Column<'ONGOING' | 'RESOLVED' | 'IMPROVED' | 'NO CHANGE' | 'WORSENED'>
	notes?: Column<string>
	patient_id?: Column<number>
	doctor_id?: Column<number>
	appointment_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	doctor?: Relation<DoctorModel>
	appointment?: Relation<AppointmentModel>
	medications?: Relation<MedicationModel>
	billings?: Relation<BillingModel>
}

export type Treatment = Plain<TreatmentModel>

export const title: keyof Treatment = 'title'
