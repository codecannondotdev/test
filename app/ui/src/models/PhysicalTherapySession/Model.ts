import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface PhysicalTherapySessionStorePayload {
	session_date: string
	duration_minutes?: number
	therapist_notes?: string
	patient_id?: number
}

export interface PhysicalTherapySessionUpdatePayload {
	session_date?: string
	duration_minutes?: number
	therapist_notes?: string
	patient_id?: number
}

export interface PhysicalTherapySessionModel extends Model {
	id: Column<string | number>
	session_date: Column<string>
	duration_minutes?: Column<number>
	therapist_notes?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type PhysicalTherapySession = Plain<PhysicalTherapySessionModel>

export const title: keyof PhysicalTherapySession = 'session_date'
