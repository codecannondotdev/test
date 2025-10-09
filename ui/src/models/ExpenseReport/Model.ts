import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ExpenseModel } from '@/models/Expense/Model'

export interface ExpenseReportStorePayload {
	title: string
	total_amount: number
	currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD'
	submitted_at?: string
	status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REIMBURSED' | 'DECLINED'
	notes?: string
}

export interface ExpenseReportUpdatePayload {
	title?: string
	total_amount?: number
	currency?: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD'
	submitted_at?: string
	status?: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REIMBURSED' | 'DECLINED'
	notes?: string
}

export interface ExpenseReportModel extends Model {
	id: Column<string | number>
	title: Column<string>
	total_amount: Column<number>
	currency: Column<'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD'>
	submitted_at?: Column<string>
	status: Column<'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REIMBURSED' | 'DECLINED'>
	notes?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	reportedExpenses?: Relation<ExpenseModel>
	expenses?: Relation<ExpenseModel>
}

export type ExpenseReport = Plain<ExpenseReportModel>

export const title: keyof ExpenseReport = 'title'
