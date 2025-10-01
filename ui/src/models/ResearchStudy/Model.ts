import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ClinicalTrialModel } from '@/models/ClinicalTrial/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface ResearchStudyStorePayload {
	title: string
	principal_investigator?: string
	start_date?: string
	end_date?: string
}

export interface ResearchStudyUpdatePayload {
	title?: string
	principal_investigator?: string
	start_date?: string
	end_date?: string
}

export interface ResearchStudyModel extends Model {
	id: Column<string | number>
	title: Column<string>
	principal_investigator?: Column<string>
	start_date?: Column<string>
	end_date?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	clinicalTrials?: Relation<ClinicalTrialModel>
	participants?: Relation<PatientModel>
}

export type ResearchStudy = Plain<ResearchStudyModel>

export const title: keyof ResearchStudy = 'title'
