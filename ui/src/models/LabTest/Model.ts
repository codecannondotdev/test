import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { LabOrderModel } from '@/models/LabOrder/Model'
import type { TestResultModel } from '@/models/TestResult/Model'

export interface LabTestStorePayload {
	test_name: string
	specimen_type?: string
	order_date: string
	status?: 'Ordered' | 'Collected' | 'Processing' | 'Completed'
	patient_id?: number
	ordering_doctor_id?: number
	lab_order_id?: number
}

export interface LabTestUpdatePayload {
	test_name?: string
	specimen_type?: string
	order_date?: string
	status?: 'Ordered' | 'Collected' | 'Processing' | 'Completed'
	patient_id?: number
	ordering_doctor_id?: number
	lab_order_id?: number
}

export interface LabTestModel extends Model {
	id: Column<string | number>
	test_name: Column<string>
	specimen_type?: Column<string>
	order_date: Column<string>
	status?: Column<'Ordered' | 'Collected' | 'Processing' | 'Completed'>
	patient_id?: Column<number>
	ordering_doctor_id?: Column<number>
	lab_order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	orderingDoctor?: Relation<DoctorModel>
	labOrder?: Relation<LabOrderModel>
	results?: Relation<TestResultModel>
}

export type LabTest = Plain<LabTestModel>

export const title: keyof LabTest = 'test_name'
