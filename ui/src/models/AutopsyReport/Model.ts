import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MortalityReportModel } from '@/models/MortalityReport/Model'

export interface AutopsyReportStorePayload {
	findings?: string
	conclusion?: string
	report_date?: string
	mortality_report_id?: number
}

export interface AutopsyReportUpdatePayload {
	findings?: string
	conclusion?: string
	report_date?: string
	mortality_report_id?: number
}

export interface AutopsyReportModel extends Model {
	id: Column<string | number>
	findings?: Column<string>
	conclusion?: Column<string>
	report_date?: Column<string>
	mortality_report_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	mortalityReport?: Relation<MortalityReportModel>
}

export type AutopsyReport = Plain<AutopsyReportModel>

export const title: keyof AutopsyReport = 'findings'
