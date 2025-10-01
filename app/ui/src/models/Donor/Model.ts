import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProcurementOrderModel } from '@/models/ProcurementOrder/Model'
import type { BloodBankModel } from '@/models/BloodBank/Model'

export interface DonorStorePayload {
	name: string
	donor_identifier?: string
	blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
}

export interface DonorUpdatePayload {
	name?: string
	donor_identifier?: string
	blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
}

export interface DonorModel extends Model {
	id: Column<string | number>
	name: Column<string>
	donor_identifier?: Column<string>
	blood_type?: Column<'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'>
	created_at: Column<string>
	updated_at: Column<string>
	donationEvents?: Relation<ProcurementOrderModel>
	bloodBanks?: Relation<BloodBankModel>
}

export type Donor = Plain<DonorModel>

export const title: keyof Donor = 'name'
