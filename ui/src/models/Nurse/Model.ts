import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShiftAssignmentModel } from '@/models/ShiftAssignment/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { TrainingRecordModel } from '@/models/TrainingRecord/Model'
import type { DepartmentModel } from '@/models/Department/Model'
import type { WardModel } from '@/models/Ward/Model'

export interface NurseStorePayload {
	first_name: string
	last_name: string
	license_number?: string
	shift_type?: 'DAY' | 'NIGHT' | 'ROTATING'
	phone?: string
	email?: string
}

export interface NurseUpdatePayload {
	first_name?: string
	last_name?: string
	license_number?: string
	shift_type?: 'DAY' | 'NIGHT' | 'ROTATING'
	phone?: string
	email?: string
}

export interface NurseModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	license_number?: Column<string>
	shift_type?: Column<'DAY' | 'NIGHT' | 'ROTATING'>
	phone?: Column<string>
	email?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	assignments?: Relation<ShiftAssignmentModel>
	appointments?: Relation<AppointmentModel>
	trainingRecords?: Relation<TrainingRecordModel>
	departments?: Relation<DepartmentModel>
	wards?: Relation<WardModel>
}

export type Nurse = Plain<NurseModel>

export const title: keyof Nurse = 'first_name'
