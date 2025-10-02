import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { BillingModel } from '@/models/Billing/Model'

export interface MedicationStorePayload {
	name: string
	dosage_form: string
	strength?: string
	administration_instructions?: string
	common_side_effects?: string
	precautions?: string
}

export interface MedicationUpdatePayload {
	name?: string
	dosage_form?: string
	strength?: string
	administration_instructions?: string
	common_side_effects?: string
	precautions?: string
}

export interface MedicationModel extends Model {
	id: Column<string | number>
	name: Column<string>
	dosage_form: Column<string>
	strength?: Column<string>
	administration_instructions?: Column<string>
	common_side_effects?: Column<string>
	precautions?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	treatments?: Relation<TreatmentModel>
	billings?: Relation<BillingModel>
}

export type Medication = Plain<MedicationModel>

export const title: keyof Medication = 'name'
