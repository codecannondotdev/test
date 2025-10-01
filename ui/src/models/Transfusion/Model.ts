import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { BloodBankModel } from '@/models/BloodBank/Model'
import type { BloodProductModel } from '@/models/BloodProduct/Model'

export interface TransfusionStorePayload {
	transfusion_date: string
	volume?: string
	reaction_observed?: string
	patient_id?: number
	blood_bank_id?: number
	blood_product_id?: number
}

export interface TransfusionUpdatePayload {
	transfusion_date?: string
	volume?: string
	reaction_observed?: string
	patient_id?: number
	blood_bank_id?: number
	blood_product_id?: number
}

export interface TransfusionModel extends Model {
	id: Column<string | number>
	transfusion_date: Column<string>
	volume?: Column<string>
	reaction_observed?: Column<string>
	patient_id?: Column<number>
	blood_bank_id?: Column<number>
	blood_product_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	bloodBank?: Relation<BloodBankModel>
	bloodProduct?: Relation<BloodProductModel>
}

export type Transfusion = Plain<TransfusionModel>

export const title: keyof Transfusion = 'transfusion_date'
