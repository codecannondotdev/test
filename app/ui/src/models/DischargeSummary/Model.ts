import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DischargeModel } from '@/models/Discharge/Model'

export interface DischargeSummaryStorePayload {
	summary_text: string
	discharge_id?: number
}

export interface DischargeSummaryUpdatePayload {
	summary_text?: string
	discharge_id?: number
}

export interface DischargeSummaryModel extends Model {
	id: Column<string | number>
	summary_text: Column<string>
	discharge_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	discharge?: Relation<DischargeModel>
}

export type DischargeSummary = Plain<DischargeSummaryModel>

export const title: keyof DischargeSummary = 'summary_text'
