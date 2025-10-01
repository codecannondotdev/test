import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DocumentModel } from '@/models/Document/Model'
import type { DICOMInstanceModel } from '@/models/DICOMInstance/Model'
import type { RadiologyReportModel } from '@/models/RadiologyReport/Model'

export interface ImagingStudyStorePayload {
	study_type: string
	study_date: string
	description?: string
	patient_id?: number
}

export interface ImagingStudyUpdatePayload {
	study_type?: string
	study_date?: string
	description?: string
	patient_id?: number
}

export interface ImagingStudyModel extends Model {
	id: Column<string | number>
	study_type: Column<string>
	study_date: Column<string>
	description?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	documents?: Relation<DocumentModel>
	dicomInstances?: Relation<DICOMInstanceModel>
	radiologyReport?: Relation<RadiologyReportModel>
}

export type ImagingStudy = Plain<ImagingStudyModel>

export const title: keyof ImagingStudy = 'study_type'
