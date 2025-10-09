import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ExpenseModel } from '@/models/Expense/Model'

export interface ProjectStorePayload {
	name: string
	code?: string
	start_date?: string
	end_date?: string
	notes?: string
}

export interface ProjectUpdatePayload {
	name?: string
	code?: string
	start_date?: string
	end_date?: string
	notes?: string
}

export interface ProjectModel extends Model {
	id: Column<string | number>
	name: Column<string>
	code?: Column<string>
	start_date?: Column<string>
	end_date?: Column<string>
	notes?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	expenses?: Relation<ExpenseModel>
}

export type Project = Plain<ProjectModel>

export const title: keyof Project = 'name'
