import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { TrainingRecordModel } from '@/models/TrainingRecord/Model'

export interface CertificationStorePayload {
	name: string
	authority?: string
	date_awarded?: string
}

export interface CertificationUpdatePayload {
	name?: string
	authority?: string
	date_awarded?: string
}

export interface CertificationModel extends Model {
	id: Column<string | number>
	name: Column<string>
	authority?: Column<string>
	date_awarded?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	trainingRecords?: Relation<TrainingRecordModel>
}

export type Certification = Plain<CertificationModel>

export const title: keyof Certification = 'name'
