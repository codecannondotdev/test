import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { RiskAssessmentModel } from '@/models/RiskAssessment/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface ScoreStorePayload {
	name: string
	value: number
	interpretation?: string
	patient_id?: number
	risk_assessment_id?: number
}

export interface ScoreUpdatePayload {
	name?: string
	value?: number
	interpretation?: string
	patient_id?: number
	risk_assessment_id?: number
}

export interface ScoreModel extends Model {
	id: Column<string | number>
	name: Column<string>
	value: Column<number>
	interpretation?: Column<string>
	patient_id?: Column<number>
	risk_assessment_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	riskAssessment?: Relation<RiskAssessmentModel>
	patient?: Relation<PatientModel>
}

export type Score = Plain<ScoreModel>

export const title: keyof Score = 'name'
