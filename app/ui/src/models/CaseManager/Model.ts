import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { CarePlanModel } from '@/models/CarePlan/Model'

export interface CaseManagerStorePayload {
	name: string
	assigned_since?: string
}

export interface CaseManagerUpdatePayload {
	name?: string
	assigned_since?: string
}

export interface CaseManagerModel extends Model {
	id: Column<string | number>
	name: Column<string>
	assigned_since?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	patients?: Relation<PatientModel>
	carePlans?: Relation<CarePlanModel>
}

export type CaseManager = Plain<CaseManagerModel>

export const title: keyof CaseManager = 'name'
