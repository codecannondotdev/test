import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { InsuranceClaimModel } from '@/models/InsuranceClaim/Model'
import type { FinancialTransactionModel } from '@/models/FinancialTransaction/Model'

export interface ClaimAdjustmentStorePayload {
	adjustment_code: string
	amount_adjusted?: number
	reason?: string
	insurance_claim_id?: number
}

export interface ClaimAdjustmentUpdatePayload {
	adjustment_code?: string
	amount_adjusted?: number
	reason?: string
	insurance_claim_id?: number
}

export interface ClaimAdjustmentModel extends Model {
	id: Column<string | number>
	adjustment_code: Column<string>
	amount_adjusted?: Column<number>
	reason?: Column<string>
	insurance_claim_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	insuranceClaim?: Relation<InsuranceClaimModel>
	financialTransaction?: Relation<FinancialTransactionModel>
}

export type ClaimAdjustment = Plain<ClaimAdjustmentModel>

export const title: keyof ClaimAdjustment = 'adjustment_code'
