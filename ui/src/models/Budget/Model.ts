import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { CategoryModel } from '@/models/Category/Model'
import type { ExpenseModel } from '@/models/Expense/Model'

export interface BudgetStorePayload {
	name: string
	amount: number
	start_date: string
	end_date: string
	alert_threshold?: number
	notes?: string
	category_id?: number
}

export interface BudgetUpdatePayload {
	name?: string
	amount?: number
	start_date?: string
	end_date?: string
	alert_threshold?: number
	notes?: string
	category_id?: number
}

export interface BudgetModel extends Model {
	id: Column<string | number>
	name: Column<string>
	amount: Column<number>
	start_date: Column<string>
	end_date: Column<string>
	alert_threshold?: Column<number>
	notes?: Column<string>
	category_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	category?: Relation<CategoryModel>
	expenses?: Relation<ExpenseModel>
}

export type Budget = Plain<BudgetModel>

export const title: keyof Budget = 'name'
