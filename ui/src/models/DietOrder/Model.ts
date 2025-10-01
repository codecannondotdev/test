import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { NutritionalPlanModel } from '@/models/NutritionalPlan/Model'

export interface DietOrderStorePayload {
	meal_type?: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
	start_date?: string
	end_date?: string
	patient_id?: number
	nutritional_plan_id?: number
}

export interface DietOrderUpdatePayload {
	meal_type?: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
	start_date?: string
	end_date?: string
	patient_id?: number
	nutritional_plan_id?: number
}

export interface DietOrderModel extends Model {
	id: Column<string | number>
	meal_type?: Column<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>
	start_date?: Column<string>
	end_date?: Column<string>
	patient_id?: Column<number>
	nutritional_plan_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	nutritionalPlan?: Relation<NutritionalPlanModel>
}

export type DietOrder = Plain<DietOrderModel>

export const title: keyof DietOrder = 'start_date'
