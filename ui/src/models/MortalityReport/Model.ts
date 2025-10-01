import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { AutopsyReportModel } from '@/models/AutopsyReport/Model'

export interface MortalityReportStorePayload {
	date_of_death: string
	cause?: string
	reviewed_by?: string
	patient_id?: number
}

export interface MortalityReportUpdatePayload {
	date_of_death?: string
	cause?: string
	reviewed_by?: string
	patient_id?: number
}

export interface MortalityReportModel extends Model {
	id: Column<string | number>
	date_of_death: Column<string>
	cause?: Column<string>
	reviewed_by?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	investigation?: Relation<AutopsyReportModel>
}

export type MortalityReport = Plain<MortalityReportModel>

export const title: keyof MortalityReport = 'date_of_death'
