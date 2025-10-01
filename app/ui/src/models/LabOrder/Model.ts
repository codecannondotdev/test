import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { LabTestModel } from '@/models/LabTest/Model'
import type { SpecimenModel } from '@/models/Specimen/Model'

export interface LabOrderStorePayload {
	order_date: string
	priority?: 'Routine' | 'Urgent' | 'Stat'
	status?: 'Ordered' | 'Collected' | 'Completed'
	patient_id?: number
	ordered_by_id?: number
}

export interface LabOrderUpdatePayload {
	order_date?: string
	priority?: 'Routine' | 'Urgent' | 'Stat'
	status?: 'Ordered' | 'Collected' | 'Completed'
	patient_id?: number
	ordered_by_id?: number
}

export interface LabOrderModel extends Model {
	id: Column<string | number>
	order_date: Column<string>
	priority?: Column<'Routine' | 'Urgent' | 'Stat'>
	status?: Column<'Ordered' | 'Collected' | 'Completed'>
	patient_id?: Column<number>
	ordered_by_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	orderedBy?: Relation<DoctorModel>
	labTests?: Relation<LabTestModel>
	specimens?: Relation<SpecimenModel>
}

export type LabOrder = Plain<LabOrderModel>

export const title: keyof LabOrder = 'order_date'
