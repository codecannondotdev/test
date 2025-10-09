import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ExpenseModel } from '@/models/Expense/Model'

export interface TagStorePayload {
	name: string
	color?: string
}

export interface TagUpdatePayload {
	name?: string
	color?: string
}

export interface TagModel extends Model {
	id: Column<string | number>
	name: Column<string>
	color?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	expenses?: Relation<ExpenseModel>
}

export type Tag = Plain<TagModel>

export const title: keyof Tag = 'name'
