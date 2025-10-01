import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { NotificationModel } from '@/models/Notification/Model'

export interface FamilyContactStorePayload {
	name: string
	relationship: string
	phone?: string
	email?: string
	patient_id?: number
}

export interface FamilyContactUpdatePayload {
	name?: string
	relationship?: string
	phone?: string
	email?: string
	patient_id?: number
}

export interface FamilyContactModel extends Model {
	id: Column<string | number>
	name: Column<string>
	relationship: Column<string>
	phone?: Column<string>
	email?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	notifications?: Relation<NotificationModel>
}

export type FamilyContact = Plain<FamilyContactModel>

export const title: keyof FamilyContact = 'name'
