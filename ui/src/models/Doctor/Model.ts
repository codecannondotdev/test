import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { DepartmentModel } from '@/models/Department/Model'

export interface DoctorStorePayload {
	first_name: string
	last_name: string
	specialty: string
	license_number: string
	contact_number?: string
	email?: string
	notes?: string
	department_id?: number
}

export interface DoctorUpdatePayload {
	first_name?: string
	last_name?: string
	specialty?: string
	license_number?: string
	contact_number?: string
	email?: string
	notes?: string
	department_id?: number
}

export interface DoctorModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	specialty: Column<string>
	license_number: Column<string>
	contact_number?: Column<string>
	email?: Column<string>
	notes?: Column<string>
	department_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	appointments?: Relation<AppointmentModel>
	treatments?: Relation<TreatmentModel>
	department?: Relation<DepartmentModel>
	headedDepartment?: Relation<DepartmentModel>
}

export type Doctor = Plain<DoctorModel>

export const title: keyof Doctor = 'first_name'
