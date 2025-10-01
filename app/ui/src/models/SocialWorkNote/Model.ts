import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface SocialWorkNoteStorePayload {
	summary?: string
	patient_id?: number
}

export interface SocialWorkNoteUpdatePayload {
	summary?: string
	patient_id?: number
}

export interface SocialWorkNoteModel extends Model {
	id: Column<string | number>
	summary?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type SocialWorkNote = Plain<SocialWorkNoteModel>

export const title: keyof SocialWorkNote = 'summary'
