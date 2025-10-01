import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { NotificationModel } from '@/models/Notification/Model'

export interface AllergyStorePayload {
	allergen: string
	reaction: string
	severity?: 'Mild' | 'Moderate' | 'Severe'
	patient_id?: number
}

export interface AllergyUpdatePayload {
	allergen?: string
	reaction?: string
	severity?: 'Mild' | 'Moderate' | 'Severe'
	patient_id?: number
}

export interface AllergyModel extends Model {
	id: Column<string | number>
	allergen: Column<string>
	reaction: Column<string>
	severity?: Column<'Mild' | 'Moderate' | 'Severe'>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	alerts?: Relation<NotificationModel>
}

export type Allergy = Plain<AllergyModel>

export const title: keyof Allergy = 'allergen'
