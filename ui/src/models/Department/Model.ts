import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { NurseModel } from '@/models/Nurse/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'

export interface DepartmentStorePayload {
	name: string
	floor?: string
	phone_extension?: string
	description?: string
	head_doctor_id?: number
}

export interface DepartmentUpdatePayload {
	name?: string
	floor?: string
	phone_extension?: string
	description?: string
	head_doctor_id?: number
}

export interface DepartmentModel extends Model {
	id: Column<string | number>
	name: Column<string>
	floor?: Column<string>
	phone_extension?: Column<string>
	description?: Column<string>
	head_doctor_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	doctors?: Relation<DoctorModel>
	nurses?: Relation<NurseModel>
	appointments?: Relation<AppointmentModel>
	headDoctor?: Relation<DoctorModel>
}

export type Department = Plain<DepartmentModel>

export const title: keyof Department = 'name'
