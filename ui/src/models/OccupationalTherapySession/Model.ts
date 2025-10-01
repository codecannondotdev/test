import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface OccupationalTherapySessionStorePayload {
	session_date?: string
	goals?: string
	outcome?: string
	patient_id?: number
}

export interface OccupationalTherapySessionUpdatePayload {
	session_date?: string
	goals?: string
	outcome?: string
	patient_id?: number
}

export interface OccupationalTherapySessionModel extends Model {
	id: Column<string | number>
	session_date?: Column<string>
	goals?: Column<string>
	outcome?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type OccupationalTherapySession = Plain<OccupationalTherapySessionModel>

export const title: keyof OccupationalTherapySession = 'session_date'
