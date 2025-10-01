import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { NurseModel } from '@/models/Nurse/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { WardModel } from '@/models/Ward/Model'
import type { SpecialtyModel } from '@/models/Specialty/Model'
import type { FacilityModel } from '@/models/Facility/Model'

export interface DepartmentStorePayload {
	name: string
	description?: string
	floor?: string
	facility_id?: number
}

export interface DepartmentUpdatePayload {
	name?: string
	description?: string
	floor?: string
	facility_id?: number
}

export interface DepartmentModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	floor?: Column<string>
	facility_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	doctors?: Relation<DoctorModel>
	nurses?: Relation<NurseModel>
	appointments?: Relation<AppointmentModel>
	wards?: Relation<WardModel>
	specialties?: Relation<SpecialtyModel>
	facility?: Relation<FacilityModel>
}

export type Department = Plain<DepartmentModel>

export const title: keyof Department = 'name'
