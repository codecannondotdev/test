import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { CareTeamModel } from '@/models/CareTeam/Model'

export interface PalliativeCarePlanStorePayload {
	goals?: string
	medications?: string
	advance_directives?: string
	patient_id?: number
	care_team_id?: number
}

export interface PalliativeCarePlanUpdatePayload {
	goals?: string
	medications?: string
	advance_directives?: string
	patient_id?: number
	care_team_id?: number
}

export interface PalliativeCarePlanModel extends Model {
	id: Column<string | number>
	goals?: Column<string>
	medications?: Column<string>
	advance_directives?: Column<string>
	patient_id?: Column<number>
	care_team_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	careTeam?: Relation<CareTeamModel>
}

export type PalliativeCarePlan = Plain<PalliativeCarePlanModel>

export const title: keyof PalliativeCarePlan = 'goals'
