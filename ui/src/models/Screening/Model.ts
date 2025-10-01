import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { FollowUpModel } from '@/models/FollowUp/Model'

export interface ScreeningStorePayload {
	type: string
	date?: string
	result?: string
	patient_id?: number
}

export interface ScreeningUpdatePayload {
	type?: string
	date?: string
	result?: string
	patient_id?: number
}

export interface ScreeningModel extends Model {
	id: Column<string | number>
	type: Column<string>
	date?: Column<string>
	result?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	followUp?: Relation<FollowUpModel>
}

export type Screening = Plain<ScreeningModel>

export const title: keyof Screening = 'type'
