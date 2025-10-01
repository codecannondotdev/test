import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { ProcedureModel } from '@/models/Procedure/Model'

export interface ConsentFormStorePayload {
	form_type: string
	signed_date?: string
	notes?: string
	patient_id?: number
	procedure_id?: number
}

export interface ConsentFormUpdatePayload {
	form_type?: string
	signed_date?: string
	notes?: string
	patient_id?: number
	procedure_id?: number
}

export interface ConsentFormModel extends Model {
	id: Column<string | number>
	form_type: Column<string>
	signed_date?: Column<string>
	notes?: Column<string>
	patient_id?: Column<number>
	procedure_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	procedure?: Relation<ProcedureModel>
}

export type ConsentForm = Plain<ConsentFormModel>

export const title: keyof ConsentForm = 'form_type'
