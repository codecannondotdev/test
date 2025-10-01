import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { ImmunizationModel } from '@/models/Immunization/Model'

export interface VaccineRecordStorePayload {
	vaccine_name: string
	date_administered: string
	dose_number?: number
	patient_id?: number
	immunization_id?: number
}

export interface VaccineRecordUpdatePayload {
	vaccine_name?: string
	date_administered?: string
	dose_number?: number
	patient_id?: number
	immunization_id?: number
}

export interface VaccineRecordModel extends Model {
	id: Column<string | number>
	vaccine_name: Column<string>
	date_administered: Column<string>
	dose_number?: Column<number>
	patient_id?: Column<number>
	immunization_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	immunization?: Relation<ImmunizationModel>
}

export type VaccineRecord = Plain<VaccineRecordModel>

export const title: keyof VaccineRecord = 'vaccine_name'
