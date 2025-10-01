import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { ResearchStudyModel } from '@/models/ResearchStudy/Model'

export interface ClinicalTrialStorePayload {
	title: string
	phase?: string
	status?: 'Recruiting' | 'Active' | 'Closed'
	research_study_id?: number
}

export interface ClinicalTrialUpdatePayload {
	title?: string
	phase?: string
	status?: 'Recruiting' | 'Active' | 'Closed'
	research_study_id?: number
}

export interface ClinicalTrialModel extends Model {
	id: Column<string | number>
	title: Column<string>
	phase?: Column<string>
	status?: Column<'Recruiting' | 'Active' | 'Closed'>
	research_study_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patients?: Relation<PatientModel>
	researchStudy?: Relation<ResearchStudyModel>
}

export type ClinicalTrial = Plain<ClinicalTrialModel>

export const title: keyof ClinicalTrial = 'title'
