import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { InsuranceModel } from '@/models/Insurance/Model'
import type { BillingAccountModel } from '@/models/BillingAccount/Model'
import type { InvoiceModel } from '@/models/Invoice/Model'
import type { ClaimAdjustmentModel } from '@/models/ClaimAdjustment/Model'

export interface InsuranceClaimStorePayload {
	claim_number?: string
	submission_date?: string
	status?: 'Submitted' | 'Accepted' | 'Rejected' | 'Adjusted'
	billing_account_id?: number
	insurance_id?: number
}

export interface InsuranceClaimUpdatePayload {
	claim_number?: string
	submission_date?: string
	status?: 'Submitted' | 'Accepted' | 'Rejected' | 'Adjusted'
	billing_account_id?: number
	insurance_id?: number
}

export interface InsuranceClaimModel extends Model {
	id: Column<string | number>
	claim_number?: Column<string>
	submission_date?: Column<string>
	status?: Column<'Submitted' | 'Accepted' | 'Rejected' | 'Adjusted'>
	billing_account_id?: Column<number>
	insurance_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	insurance?: Relation<InsuranceModel>
	billingAccount?: Relation<BillingAccountModel>
	invoices?: Relation<InvoiceModel>
	claimAdjustments?: Relation<ClaimAdjustmentModel>
}

export type InsuranceClaim = Plain<InsuranceClaimModel>

export const title: keyof InsuranceClaim = 'claim_number'
