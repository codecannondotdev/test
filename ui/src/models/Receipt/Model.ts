import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ExpenseModel } from '@/models/Expense/Model'

export interface ReceiptStorePayload {
	file_name: string
	file_type: string
	uploaded_at: string
	notes?: string
	file_size?: number
	expense_id?: number
}

export interface ReceiptUpdatePayload {
	file_name?: string
	file_type?: string
	uploaded_at?: string
	notes?: string
	file_size?: number
	expense_id?: number
}

export interface ReceiptModel extends Model {
	id: Column<string | number>
	file_name: Column<string>
	file_type: Column<string>
	uploaded_at: Column<string>
	notes?: Column<string>
	file_size?: Column<number>
	expense_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	expense?: Relation<ExpenseModel>
}

export type Receipt = Plain<ReceiptModel>

export const title: keyof Receipt = 'file_name'
