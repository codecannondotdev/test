import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface EmergencyContactStorePayload {
	name: string
	relationship: string
	phone: string
	alternate_phone?: string
	patient_id?: number
}

export interface EmergencyContactUpdatePayload {
	name?: string
	relationship?: string
	phone?: string
	alternate_phone?: string
	patient_id?: number
}

export interface EmergencyContactModel extends Model {
	id: Column<string | number>
	name: Column<string>
	relationship: Column<string>
	phone: Column<string>
	alternate_phone?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type EmergencyContact = Plain<EmergencyContactModel>

export const title: keyof EmergencyContact = 'name'
