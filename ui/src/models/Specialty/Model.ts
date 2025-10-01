import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { DepartmentModel } from '@/models/Department/Model'

export interface SpecialtyStorePayload {
	name: string
	description?: string
}

export interface SpecialtyUpdatePayload {
	name?: string
	description?: string
}

export interface SpecialtyModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	doctors?: Relation<DoctorModel>
	departments?: Relation<DepartmentModel>
}

export type Specialty = Plain<SpecialtyModel>

export const title: keyof Specialty = 'name'
