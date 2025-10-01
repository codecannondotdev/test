import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface VisitStorePayload {
	visit_type?: 'OUTPATIENT' | 'INPATIENT' | 'EMERGENCY'
	start_date_time: string
	end_date_time?: string
	reason?: string
	patient_id?: number
}

export interface VisitUpdatePayload {
	visit_type?: 'OUTPATIENT' | 'INPATIENT' | 'EMERGENCY'
	start_date_time?: string
	end_date_time?: string
	reason?: string
	patient_id?: number
}

export interface VisitModel extends Model {
	id: Column<string | number>
	visit_type?: Column<'OUTPATIENT' | 'INPATIENT' | 'EMERGENCY'>
	start_date_time: Column<string>
	end_date_time?: Column<string>
	reason?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type Visit = Plain<VisitModel>

export const title: keyof Visit = 'start_date_time'
