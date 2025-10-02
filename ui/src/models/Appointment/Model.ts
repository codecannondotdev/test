import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { NurseModel } from '@/models/Nurse/Model'
import type { DepartmentModel } from '@/models/Department/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'

export interface AppointmentStorePayload {
	appointment_date_time: string
	duration_minutes?: number
	reason?: string
	status?:
		| 'SCHEDULED'
		| 'CONFIRMED'
		| 'CHECKED IN'
		| 'IN PROGRESS'
		| 'COMPLETED'
		| 'CANCELLED'
		| 'NO-SHOW'
	room?: string
	notes?: string
	patient_id?: number
	doctor_id?: number
	nurse_id?: number
	department_id?: number
}

export interface AppointmentUpdatePayload {
	appointment_date_time?: string
	duration_minutes?: number
	reason?: string
	status?:
		| 'SCHEDULED'
		| 'CONFIRMED'
		| 'CHECKED IN'
		| 'IN PROGRESS'
		| 'COMPLETED'
		| 'CANCELLED'
		| 'NO-SHOW'
	room?: string
	notes?: string
	patient_id?: number
	doctor_id?: number
	nurse_id?: number
	department_id?: number
}

export interface AppointmentModel extends Model {
	id: Column<string | number>
	appointment_date_time: Column<string>
	duration_minutes?: Column<number>
	reason?: Column<string>
	status?: Column<
		'SCHEDULED' | 'CONFIRMED' | 'CHECKED IN' | 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO-SHOW'
	>
	room?: Column<string>
	notes?: Column<string>
	patient_id?: Column<number>
	doctor_id?: Column<number>
	nurse_id?: Column<number>
	department_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	doctor?: Relation<DoctorModel>
	nurse?: Relation<NurseModel>
	department?: Relation<DepartmentModel>
	treatment?: Relation<TreatmentModel>
}

export type Appointment = Plain<AppointmentModel>

export const title: keyof Appointment = 'appointment_date_time'
