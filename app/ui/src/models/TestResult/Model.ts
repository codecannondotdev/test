import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { LabTestModel } from '@/models/LabTest/Model'
import type { SpecimenModel } from '@/models/Specimen/Model'

export interface TestResultStorePayload {
	result_value: string
	units?: string
	reference_range?: string
	reported_at?: string
	lab_test_id?: number
	specimen_id?: number
}

export interface TestResultUpdatePayload {
	result_value?: string
	units?: string
	reference_range?: string
	reported_at?: string
	lab_test_id?: number
	specimen_id?: number
}

export interface TestResultModel extends Model {
	id: Column<string | number>
	result_value: Column<string>
	units?: Column<string>
	reference_range?: Column<string>
	reported_at?: Column<string>
	lab_test_id?: Column<number>
	specimen_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	labTest?: Relation<LabTestModel>
	specimen?: Relation<SpecimenModel>
}

export type TestResult = Plain<TestResultModel>

export const title: keyof TestResult = 'result_value'
