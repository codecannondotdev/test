import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DocumentModel } from '@/models/Document/Model'

export interface ActivityLogStorePayload {
	action: string
	timestamp: string
	details?: string
	related_model_id?: number
}

export interface ActivityLogUpdatePayload {
	action?: string
	timestamp?: string
	details?: string
	related_model_id?: number
}

export interface ActivityLogModel extends Model {
	id: Column<string | number>
	action: Column<string>
	timestamp: Column<string>
	details?: Column<string>
	related_model_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	relatedModel?: Relation<DocumentModel>
}

export type ActivityLog = Plain<ActivityLogModel>

export const title: keyof ActivityLog = 'timestamp'
