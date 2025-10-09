import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ExpenseModel } from '@/models/Expense/Model'

export interface CurrencyStorePayload {
	code: string
	name?: string
	exchange_rate_to_base: number
}

export interface CurrencyUpdatePayload {
	code?: string
	name?: string
	exchange_rate_to_base?: number
}

export interface CurrencyModel extends Model {
	id: Column<string | number>
	code: Column<string>
	name?: Column<string>
	exchange_rate_to_base: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	expenses?: Relation<ExpenseModel>
}

export type Currency = Plain<CurrencyModel>

export const title: keyof Currency = 'code'
