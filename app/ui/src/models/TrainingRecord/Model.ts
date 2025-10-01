import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { NurseModel } from '@/models/Nurse/Model'
import type { CertificationModel } from '@/models/Certification/Model'

export interface TrainingRecordStorePayload {
	course_name: string
	completion_date?: string
	status?: 'COMPLETED' | 'IN_PROGRESS' | 'OVERDUE'
	nurse_id?: number
	certification_id?: number
}

export interface TrainingRecordUpdatePayload {
	course_name?: string
	completion_date?: string
	status?: 'COMPLETED' | 'IN_PROGRESS' | 'OVERDUE'
	nurse_id?: number
	certification_id?: number
}

export interface TrainingRecordModel extends Model {
	id: Column<string | number>
	course_name: Column<string>
	completion_date?: Column<string>
	status?: Column<'COMPLETED' | 'IN_PROGRESS' | 'OVERDUE'>
	nurse_id?: Column<number>
	certification_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	nurse?: Relation<NurseModel>
	certification?: Relation<CertificationModel>
}

export type TrainingRecord = Plain<TrainingRecordModel>

export const title: keyof TrainingRecord = 'course_name'
