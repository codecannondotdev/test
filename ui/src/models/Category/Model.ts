import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ExpenseModel } from '@/models/Expense/Model'
import type { BudgetModel } from '@/models/Budget/Model'

export interface CategoryStorePayload {
	name: string
	description?: string
	requires_receipt: boolean
}

export interface CategoryUpdatePayload {
	name?: string
	description?: string
	requires_receipt?: boolean
}

export interface CategoryModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	requires_receipt: Column<boolean>
	created_at: Column<string>
	updated_at: Column<string>
	expenses?: Relation<ExpenseModel>
	budgets?: Relation<BudgetModel>
}

export type Category = Plain<CategoryModel>

export const title: keyof Category = 'name'
