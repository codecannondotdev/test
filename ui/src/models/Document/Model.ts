import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MedicalRecordModel } from '@/models/MedicalRecord/Model'
import type { ImagingStudyModel } from '@/models/ImagingStudy/Model'
import type { LegalHoldModel } from '@/models/LegalHold/Model'
import type { AuditLogModel } from '@/models/AuditLog/Model'
import type { ActivityLogModel } from '@/models/ActivityLog/Model'

export interface DocumentStorePayload {
	filename: string
	content_type?: string
	uploaded_at: string
	description?: string
	medical_record_id?: number
	imaging_study_id?: number
	legal_hold_id?: number
}

export interface DocumentUpdatePayload {
	filename?: string
	content_type?: string
	uploaded_at?: string
	description?: string
	medical_record_id?: number
	imaging_study_id?: number
	legal_hold_id?: number
}

export interface DocumentModel extends Model {
	id: Column<string | number>
	filename: Column<string>
	content_type?: Column<string>
	uploaded_at: Column<string>
	description?: Column<string>
	medical_record_id?: Column<number>
	imaging_study_id?: Column<number>
	legal_hold_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	medicalRecord?: Relation<MedicalRecordModel>
	imagingStudy?: Relation<ImagingStudyModel>
	legalHold?: Relation<LegalHoldModel>
	auditLogs?: Relation<AuditLogModel>
	activityLogs?: Relation<ActivityLogModel>
}

export type Document = Plain<DocumentModel>

export const title: keyof Document = 'filename'
