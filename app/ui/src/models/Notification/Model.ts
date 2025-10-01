import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { AllergyModel } from '@/models/Allergy/Model'
import type { FamilyContactModel } from '@/models/FamilyContact/Model'
import type { StaffCredentialModel } from '@/models/StaffCredential/Model'

export interface NotificationStorePayload {
	title: string
	body: string
	sent_at?: string
	read?: boolean
	related_patient_id?: number
	allergy_id?: number
	contact_id?: number
	credential_id?: number
}

export interface NotificationUpdatePayload {
	title?: string
	body?: string
	sent_at?: string
	read?: boolean
	related_patient_id?: number
	allergy_id?: number
	contact_id?: number
	credential_id?: number
}

export interface NotificationModel extends Model {
	id: Column<string | number>
	title: Column<string>
	body: Column<string>
	sent_at?: Column<string>
	read?: Column<boolean>
	related_patient_id?: Column<number>
	allergy_id?: Column<number>
	contact_id?: Column<number>
	credential_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	relatedPatient?: Relation<PatientModel>
	allergy?: Relation<AllergyModel>
	contact?: Relation<FamilyContactModel>
	credential?: Relation<StaffCredentialModel>
}

export type Notification = Plain<NotificationModel>

export const title: keyof Notification = 'title'
