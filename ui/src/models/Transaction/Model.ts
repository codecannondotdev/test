import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { OrderModel } from '@/models/Order/Model'
import type { EmployeeModel } from '@/models/Employee/Model'

export interface TransactionStorePayload {
	transaction_date: string
	amount: number
	type: string
	employee_id?: number
}

export interface TransactionUpdatePayload {
	transaction_date?: string
	amount?: number
	type?: string
	employee_id?: number
}

export interface TransactionModel extends Model {
	id: Column<string | number>
	transaction_date: Column<string>
	amount: Column<number>
	type: Column<string>
	employee_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	order?: Relation<OrderModel>
	employee?: Relation<EmployeeModel>
}

export type Transaction = Plain<TransactionModel>

export const title: keyof Transaction = 'type'
