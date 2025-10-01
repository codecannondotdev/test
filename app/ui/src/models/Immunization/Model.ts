import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { VaccineRecordModel } from '@/models/VaccineRecord/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface ImmunizationStorePayload {
	name: string
	schedule?: string
}

export interface ImmunizationUpdatePayload {
	name?: string
	schedule?: string
}

export interface ImmunizationModel extends Model {
	id: Column<string | number>
	name: Column<string>
	schedule?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	vaccineRecords?: Relation<VaccineRecordModel>
	patients?: Relation<PatientModel>
}

export type Immunization = Plain<ImmunizationModel>

export const title: keyof Immunization = 'name'
