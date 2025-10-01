import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DietOrderModel } from '@/models/DietOrder/Model'

export interface NutritionalPlanStorePayload {
	diet_type: string
	calorie_goal: number
	notes?: string
	patient_id?: number
}

export interface NutritionalPlanUpdatePayload {
	diet_type?: string
	calorie_goal?: number
	notes?: string
	patient_id?: number
}

export interface NutritionalPlanModel extends Model {
	id: Column<string | number>
	diet_type: Column<string>
	calorie_goal: Column<number>
	notes?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	dietOrders?: Relation<DietOrderModel>
}

export type NutritionalPlan = Plain<NutritionalPlanModel>

export const title: keyof NutritionalPlan = 'calorie_goal'
