import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DocumentModel } from '@/models/Document/Model'
import type { NoteModel } from '@/models/Note/Model'

export interface MedicalRecordStorePayload {
	title: string
	date: string
	summary?: string
	patient_id?: number
}

export interface MedicalRecordUpdatePayload {
	title?: string
	date?: string
	summary?: string
	patient_id?: number
}

export interface MedicalRecordModel extends Model {
	id: Column<string | number>
	title: Column<string>
	date: Column<string>
	summary?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	attachments?: Relation<DocumentModel>
	notes?: Relation<NoteModel>
}

export type MedicalRecord = Plain<MedicalRecordModel>

export const title: keyof MedicalRecord = 'title'
