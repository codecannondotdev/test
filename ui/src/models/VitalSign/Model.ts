import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface VitalSignStorePayload {
	type?: 'TEMPERATURE' | 'PULSE' | 'BP' | 'RESPIRATORY_RATE' | 'SPO2'
	value?: string
	recorded_at?: string
	notes?: string
	patient_id?: number
}

export interface VitalSignUpdatePayload {
	type?: 'TEMPERATURE' | 'PULSE' | 'BP' | 'RESPIRATORY_RATE' | 'SPO2'
	value?: string
	recorded_at?: string
	notes?: string
	patient_id?: number
}

export interface VitalSignModel extends Model {
	id: Column<string | number>
	type?: Column<'TEMPERATURE' | 'PULSE' | 'BP' | 'RESPIRATORY_RATE' | 'SPO2'>
	value?: Column<string>
	recorded_at?: Column<string>
	notes?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type VitalSign = Plain<VitalSignModel>

export const title: keyof VitalSign = 'type'
