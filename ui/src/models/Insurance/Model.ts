import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { InsuranceClaimModel } from '@/models/InsuranceClaim/Model'

export interface InsuranceStorePayload {
	provider_name: string
	policy_number?: string
	coverage_type?: string
	preauthorization_required?: boolean
}

export interface InsuranceUpdatePayload {
	provider_name?: string
	policy_number?: string
	coverage_type?: string
	preauthorization_required?: boolean
}

export interface InsuranceModel extends Model {
	id: Column<string | number>
	provider_name: Column<string>
	policy_number?: Column<string>
	coverage_type?: Column<string>
	preauthorization_required?: Column<boolean>
	created_at: Column<string>
	updated_at: Column<string>
	patients?: Relation<PatientModel>
	insuranceClaims?: Relation<InsuranceClaimModel>
}

export type Insurance = Plain<InsuranceModel>

export const title: keyof Insurance = 'provider_name'
