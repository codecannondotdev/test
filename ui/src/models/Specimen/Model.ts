import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { LabOrderModel } from '@/models/LabOrder/Model'
import type { PathologyReportModel } from '@/models/PathologyReport/Model'
import type { TestResultModel } from '@/models/TestResult/Model'
import type { SampleModel } from '@/models/Sample/Model'
import type { BarcodeLabelModel } from '@/models/BarcodeLabel/Model'

export interface SpecimenStorePayload {
	label: string
	collected_at: string
	storage_location?: string
	pathology_report_id?: number
	lab_order_id?: number
}

export interface SpecimenUpdatePayload {
	label?: string
	collected_at?: string
	storage_location?: string
	pathology_report_id?: number
	lab_order_id?: number
}

export interface SpecimenModel extends Model {
	id: Column<string | number>
	label: Column<string>
	collected_at: Column<string>
	storage_location?: Column<string>
	pathology_report_id?: Column<number>
	lab_order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	labOrder?: Relation<LabOrderModel>
	pathologyReport?: Relation<PathologyReportModel>
	testResults?: Relation<TestResultModel>
	sample?: Relation<SampleModel>
	barcodeLabels?: Relation<BarcodeLabelModel>
}

export type Specimen = Plain<SpecimenModel>

export const title: keyof Specimen = 'label'
