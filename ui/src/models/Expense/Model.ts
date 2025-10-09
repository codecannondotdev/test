import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { CategoryModel } from '@/models/Category/Model'
import type { VendorModel } from '@/models/Vendor/Model'
import type { ProjectModel } from '@/models/Project/Model'
import type { BudgetModel } from '@/models/Budget/Model'
import type { ReceiptModel } from '@/models/Receipt/Model'
import type { TagModel } from '@/models/Tag/Model'
import type { ExpenseReportModel } from '@/models/ExpenseReport/Model'
import type { CurrencyModel } from '@/models/Currency/Model'

export interface ExpenseStorePayload {
	title: string
	amount: number
	date_incurred: string
	payment_date?: string
	status?: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REIMBURSED' | 'DECLINED'
	payment_method?: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'OTHER'
	notes?: string
	is_recurring: boolean
	receipt_attached: boolean
	category_id?: number
	vendor_id?: number
	project_id?: number
	budget_id?: number
	currency_id?: number
}

export interface ExpenseUpdatePayload {
	title?: string
	amount?: number
	date_incurred?: string
	payment_date?: string
	status?: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REIMBURSED' | 'DECLINED'
	payment_method?: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'OTHER'
	notes?: string
	is_recurring?: boolean
	receipt_attached?: boolean
	category_id?: number
	vendor_id?: number
	project_id?: number
	budget_id?: number
	currency_id?: number
}

export interface ExpenseModel extends Model {
	id: Column<string | number>
	title: Column<string>
	amount: Column<number>
	date_incurred: Column<string>
	payment_date?: Column<string>
	status?: Column<'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REIMBURSED' | 'DECLINED'>
	payment_method?: Column<'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'OTHER'>
	notes?: Column<string>
	is_recurring: Column<boolean>
	receipt_attached: Column<boolean>
	category_id?: Column<number>
	vendor_id?: Column<number>
	project_id?: Column<number>
	budget_id?: Column<number>
	currency_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	category?: Relation<CategoryModel>
	vendor?: Relation<VendorModel>
	project?: Relation<ProjectModel>
	budget?: Relation<BudgetModel>
	receipts?: Relation<ReceiptModel>
	tags?: Relation<TagModel>
	reports?: Relation<ExpenseReportModel>
	expenseReports?: Relation<ExpenseReportModel>
	currency?: Relation<CurrencyModel>
}

export type Expense = Plain<ExpenseModel>

export const title: keyof Expense = 'title'
