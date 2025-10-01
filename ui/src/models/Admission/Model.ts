import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { WardModel } from '@/models/Ward/Model'
import type { BedModel } from '@/models/Bed/Model'
import type { DischargeModel } from '@/models/Discharge/Model'

export interface AdmissionStorePayload {
	admission_date: string
	reason?: string
	status?: 'Active' | 'Discharged' | 'Transferred'
	patient_id?: number
	ward_id?: number
	bed_id?: number
}

export interface AdmissionUpdatePayload {
	admission_date?: string
	reason?: string
	status?: 'Active' | 'Discharged' | 'Transferred'
	patient_id?: number
	ward_id?: number
	bed_id?: number
}

export interface AdmissionModel extends Model {
	id: Column<string | number>
	admission_date: Column<string>
	reason?: Column<string>
	status?: Column<'Active' | 'Discharged' | 'Transferred'>
	patient_id?: Column<number>
	ward_id?: Column<number>
	bed_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	ward?: Relation<WardModel>
	bed?: Relation<BedModel>
	discharge?: Relation<DischargeModel>
}

export type Admission = Plain<AdmissionModel>

export const title: keyof Admission = 'admission_date'
