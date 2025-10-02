import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { DepartmentModel } from '@/models/Department/Model'

export interface NurseStorePayload {
	first_name: string
	last_name: string
	license_number?: string
	contact_number?: string
	shift?: 'Morning' | 'Afternoon' | 'Night'
	notes?: string
	department_id?: number
}

export interface NurseUpdatePayload {
	first_name?: string
	last_name?: string
	license_number?: string
	contact_number?: string
	shift?: 'Morning' | 'Afternoon' | 'Night'
	notes?: string
	department_id?: number
}

export interface NurseModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	license_number?: Column<string>
	contact_number?: Column<string>
	shift?: Column<'Morning' | 'Afternoon' | 'Night'>
	notes?: Column<string>
	department_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	appointments?: Relation<AppointmentModel>
	department?: Relation<DepartmentModel>
}

export type Nurse = Plain<NurseModel>

export const title: keyof Nurse = 'first_name'
