import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { ScoreModel } from '@/models/Score/Model'

export interface RiskAssessmentStorePayload {
	tool_name: string
	score?: number
	assessment_date?: string
	patient_id?: number
}

export interface RiskAssessmentUpdatePayload {
	tool_name?: string
	score?: number
	assessment_date?: string
	patient_id?: number
}

export interface RiskAssessmentModel extends Model {
	id: Column<string | number>
	tool_name: Column<string>
	score?: Column<number>
	assessment_date?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	scores?: Relation<ScoreModel>
}

export type RiskAssessment = Plain<RiskAssessmentModel>

export const title: keyof RiskAssessment = 'tool_name'
