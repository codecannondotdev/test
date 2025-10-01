import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DocumentModel } from '@/models/Document/Model'

export interface AuditLogStorePayload {
	event_type: string
	performed_at: string
	details?: string
	affected_record_id?: number
}

export interface AuditLogUpdatePayload {
	event_type?: string
	performed_at?: string
	details?: string
	affected_record_id?: number
}

export interface AuditLogModel extends Model {
	id: Column<string | number>
	event_type: Column<string>
	performed_at: Column<string>
	details?: Column<string>
	affected_record_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	affectedRecord?: Relation<DocumentModel>
}

export type AuditLog = Plain<AuditLogModel>

export const title: keyof AuditLog = 'event_type'
