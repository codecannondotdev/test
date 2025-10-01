import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { LedgerAccountModel } from '@/models/LedgerAccount/Model'
import type { PaymentModel } from '@/models/Payment/Model'
import type { ClaimAdjustmentModel } from '@/models/ClaimAdjustment/Model'

export interface FinancialTransactionStorePayload {
	date: string
	amount: number
	description?: string
	ledger_account_id?: number
	payment_id?: number
	claim_adjustment_id?: number
}

export interface FinancialTransactionUpdatePayload {
	date?: string
	amount?: number
	description?: string
	ledger_account_id?: number
	payment_id?: number
	claim_adjustment_id?: number
}

export interface FinancialTransactionModel extends Model {
	id: Column<string | number>
	date: Column<string>
	amount: Column<number>
	description?: Column<string>
	ledger_account_id?: Column<number>
	payment_id?: Column<number>
	claim_adjustment_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	ledgerAccount?: Relation<LedgerAccountModel>
	payment?: Relation<PaymentModel>
	claimAdjustment?: Relation<ClaimAdjustmentModel>
}

export type FinancialTransaction = Plain<FinancialTransactionModel>

export const title: keyof FinancialTransaction = 'date'
