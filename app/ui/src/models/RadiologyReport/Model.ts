import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { ImagingStudyModel } from '@/models/ImagingStudy/Model'

export interface RadiologyReportStorePayload {
	study_type: string
	findings?: string
	impression?: string
	report_date: string
	patient_id?: number
	imaging_study_id?: number
}

export interface RadiologyReportUpdatePayload {
	study_type?: string
	findings?: string
	impression?: string
	report_date?: string
	patient_id?: number
	imaging_study_id?: number
}

export interface RadiologyReportModel extends Model {
	id: Column<string | number>
	study_type: Column<string>
	findings?: Column<string>
	impression?: Column<string>
	report_date: Column<string>
	patient_id?: Column<number>
	imaging_study_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	imagingStudy?: Relation<ImagingStudyModel>
}

export type RadiologyReport = Plain<RadiologyReportModel>

export const title: keyof RadiologyReport = 'study_type'
