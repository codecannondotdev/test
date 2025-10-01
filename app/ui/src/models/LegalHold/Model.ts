import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DocumentModel } from '@/models/Document/Model'

export interface LegalHoldStorePayload {
	reason: string
	start_date?: string
	end_date?: string
	patient_id?: number
}

export interface LegalHoldUpdatePayload {
	reason?: string
	start_date?: string
	end_date?: string
	patient_id?: number
}

export interface LegalHoldModel extends Model {
	id: Column<string | number>
	reason: Column<string>
	start_date?: Column<string>
	end_date?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	documents?: Relation<DocumentModel>
}

export type LegalHold = Plain<LegalHoldModel>

export const title: keyof LegalHold = 'reason'
