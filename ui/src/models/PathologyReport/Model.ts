import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { SpecimenModel } from '@/models/Specimen/Model'

export interface PathologyReportStorePayload {
	specimen_description?: string
	findings?: string
	report_date?: string
	patient_id?: number
}

export interface PathologyReportUpdatePayload {
	specimen_description?: string
	findings?: string
	report_date?: string
	patient_id?: number
}

export interface PathologyReportModel extends Model {
	id: Column<string | number>
	specimen_description?: Column<string>
	findings?: Column<string>
	report_date?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	samples?: Relation<SpecimenModel>
}

export type PathologyReport = Plain<PathologyReportModel>

export const title: keyof PathologyReport = 'specimen_description'
