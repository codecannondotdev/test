import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { CareTeamModel } from '@/models/CareTeam/Model'

export interface HospiceCareStorePayload {
	start_date?: string
	plan_summary?: string
	status?: 'Active' | 'Completed'
	patient_id?: number
	care_team_id?: number
}

export interface HospiceCareUpdatePayload {
	start_date?: string
	plan_summary?: string
	status?: 'Active' | 'Completed'
	patient_id?: number
	care_team_id?: number
}

export interface HospiceCareModel extends Model {
	id: Column<string | number>
	start_date?: Column<string>
	plan_summary?: Column<string>
	status?: Column<'Active' | 'Completed'>
	patient_id?: Column<number>
	care_team_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	careTeam?: Relation<CareTeamModel>
}

export type HospiceCare = Plain<HospiceCareModel>

export const title: keyof HospiceCare = 'start_date'
