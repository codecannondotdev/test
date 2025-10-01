import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface ConsentStorePayload {
	consent_type: string
	granted?: boolean
	granted_at?: string
	patient_id?: number
}

export interface ConsentUpdatePayload {
	consent_type?: string
	granted?: boolean
	granted_at?: string
	patient_id?: number
}

export interface ConsentModel extends Model {
	id: Column<string | number>
	consent_type: Column<string>
	granted?: Column<boolean>
	granted_at?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type Consent = Plain<ConsentModel>

export const title: keyof Consent = 'consent_type'
