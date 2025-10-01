import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { CarePlanModel } from '@/models/CarePlan/Model'
import type { ProcedureModel } from '@/models/Procedure/Model'
import type { MedicationModel } from '@/models/Medication/Model'
import type { DiagnosisModel } from '@/models/Diagnosis/Model'

export interface TreatmentStorePayload {
	title: string
	description?: string
	start_date?: string
	end_date?: string
	status?: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'INTERRUPTED'
	patient_id?: number
	supervising_doctor_id?: number
	care_plan_id?: number
	diagnosis_id?: number
}

export interface TreatmentUpdatePayload {
	title?: string
	description?: string
	start_date?: string
	end_date?: string
	status?: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'INTERRUPTED'
	patient_id?: number
	supervising_doctor_id?: number
	care_plan_id?: number
	diagnosis_id?: number
}

export interface TreatmentModel extends Model {
	id: Column<string | number>
	title: Column<string>
	description?: Column<string>
	start_date?: Column<string>
	end_date?: Column<string>
	status?: Column<'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'INTERRUPTED'>
	patient_id?: Column<number>
	supervising_doctor_id?: Column<number>
	care_plan_id?: Column<number>
	diagnosis_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	supervisingDoctor?: Relation<DoctorModel>
	carePlan?: Relation<CarePlanModel>
	procedures?: Relation<ProcedureModel>
	medications?: Relation<MedicationModel>
	diagnosis?: Relation<DiagnosisModel>
}

export type Treatment = Plain<TreatmentModel>

export const title: keyof Treatment = 'title'
