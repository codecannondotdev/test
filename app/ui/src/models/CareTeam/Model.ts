import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { CarePlanModel } from '@/models/CarePlan/Model'
import type { HospiceCareModel } from '@/models/HospiceCare/Model'
import type { PalliativeCarePlanModel } from '@/models/PalliativeCarePlan/Model'

export interface CareTeamStorePayload {
	name: string
	scope?: string
}

export interface CareTeamUpdatePayload {
	name?: string
	scope?: string
}

export interface CareTeamModel extends Model {
	id: Column<string | number>
	name: Column<string>
	scope?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	patients?: Relation<PatientModel>
	carePlans?: Relation<CarePlanModel>
	hospiceCare?: Relation<HospiceCareModel>
	palliativeCarePlans?: Relation<PalliativeCarePlanModel>
}

export type CareTeam = Plain<CareTeamModel>

export const title: keyof CareTeam = 'name'
