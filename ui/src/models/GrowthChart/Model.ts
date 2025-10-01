import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface GrowthChartStorePayload {
	measurement_date: string
	weight?: number
	height?: number
	head_circumference?: number
	patient_id?: number
}

export interface GrowthChartUpdatePayload {
	measurement_date?: string
	weight?: number
	height?: number
	head_circumference?: number
	patient_id?: number
}

export interface GrowthChartModel extends Model {
	id: Column<string | number>
	measurement_date: Column<string>
	weight?: Column<number>
	height?: Column<number>
	head_circumference?: Column<number>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type GrowthChart = Plain<GrowthChartModel>

export const title: keyof GrowthChart = 'measurement_date'
