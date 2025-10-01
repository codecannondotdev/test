import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { CareTeamModel } from '@/models/CareTeam/Model'
import type { CaseManagerModel } from '@/models/CaseManager/Model'

export interface CarePlanStorePayload {
	title: string
	goals?: string
	start_date?: string
	end_date?: string
	patient_id?: number
	care_team_id?: number
	case_manager_id?: number
}

export interface CarePlanUpdatePayload {
	title?: string
	goals?: string
	start_date?: string
	end_date?: string
	patient_id?: number
	care_team_id?: number
	case_manager_id?: number
}

export interface CarePlanModel extends Model {
	id: Column<string | number>
	title: Column<string>
	goals?: Column<string>
	start_date?: Column<string>
	end_date?: Column<string>
	patient_id?: Column<number>
	care_team_id?: Column<number>
	case_manager_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	treatments?: Relation<TreatmentModel>
	careTeam?: Relation<CareTeamModel>
	caseManager?: Relation<CaseManagerModel>
}

export type CarePlan = Plain<CarePlanModel>

export const title: keyof CarePlan = 'title'
