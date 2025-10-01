import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { FinancialTransactionModel } from '@/models/FinancialTransaction/Model'

export interface LedgerAccountStorePayload {
	account_number: string
	name: string
	type?: 'Asset' | 'Liability' | 'Revenue' | 'Expense' | 'Equity'
}

export interface LedgerAccountUpdatePayload {
	account_number?: string
	name?: string
	type?: 'Asset' | 'Liability' | 'Revenue' | 'Expense' | 'Equity'
}

export interface LedgerAccountModel extends Model {
	id: Column<string | number>
	account_number: Column<string>
	name: Column<string>
	type?: Column<'Asset' | 'Liability' | 'Revenue' | 'Expense' | 'Equity'>
	created_at: Column<string>
	updated_at: Column<string>
	financialTransactions?: Relation<FinancialTransactionModel>
}

export type LedgerAccount = Plain<LedgerAccountModel>

export const title: keyof LedgerAccount = 'name'
