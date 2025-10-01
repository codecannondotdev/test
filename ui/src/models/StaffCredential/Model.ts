import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { NotificationModel } from '@/models/Notification/Model'

export interface StaffCredentialStorePayload {
	type: string
	number?: string
	issued_date?: string
	expiry_date?: string
}

export interface StaffCredentialUpdatePayload {
	type?: string
	number?: string
	issued_date?: string
	expiry_date?: string
}

export interface StaffCredentialModel extends Model {
	id: Column<string | number>
	type: Column<string>
	number?: Column<string>
	issued_date?: Column<string>
	expiry_date?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	alerts?: Relation<NotificationModel>
}

export type StaffCredential = Plain<StaffCredentialModel>

export const title: keyof StaffCredential = 'type'
