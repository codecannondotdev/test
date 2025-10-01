import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DonorModel } from '@/models/Donor/Model'
import type { TransfusionModel } from '@/models/Transfusion/Model'

export interface BloodBankStorePayload {
	unit_number: string
	blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
	status?: 'Available' | 'Transfused' | 'Quarantined'
}

export interface BloodBankUpdatePayload {
	unit_number?: string
	blood_type?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
	status?: 'Available' | 'Transfused' | 'Quarantined'
}

export interface BloodBankModel extends Model {
	id: Column<string | number>
	unit_number: Column<string>
	blood_type?: Column<'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'>
	status?: Column<'Available' | 'Transfused' | 'Quarantined'>
	created_at: Column<string>
	updated_at: Column<string>
	donors?: Relation<DonorModel>
	transfusions?: Relation<TransfusionModel>
}

export type BloodBank = Plain<BloodBankModel>

export const title: keyof BloodBank = 'unit_number'
