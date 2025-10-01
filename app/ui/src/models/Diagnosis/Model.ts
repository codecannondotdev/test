import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'

export interface DiagnosisStorePayload {
	code?: string
	description: string
	primary?: boolean
	patient_id?: number
}

export interface DiagnosisUpdatePayload {
	code?: string
	description?: string
	primary?: boolean
	patient_id?: number
}

export interface DiagnosisModel extends Model {
	id: Column<string | number>
	code?: Column<string>
	description: Column<string>
	primary?: Column<boolean>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	treatments?: Relation<TreatmentModel>
}

export type Diagnosis = Plain<DiagnosisModel>

export const title: keyof Diagnosis = 'description'
