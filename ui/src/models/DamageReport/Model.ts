import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProductModel } from '@/models/Product/Model'
import type { EmployeeModel } from '@/models/Employee/Model'

export interface DamageReportStorePayload {
	report_date: string
	description: string
	severity?: 'MINOR' | 'MAJOR' | 'CRITICAL'
	employee_id?: number
}

export interface DamageReportUpdatePayload {
	report_date?: string
	description?: string
	severity?: 'MINOR' | 'MAJOR' | 'CRITICAL'
	employee_id?: number
}

export interface DamageReportModel extends Model {
	id: Column<string | number>
	report_date: Column<string>
	description: Column<string>
	severity?: Column<'MINOR' | 'MAJOR' | 'CRITICAL'>
	employee_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	product?: Relation<ProductModel>
	employee?: Relation<EmployeeModel>
}

export type DamageReport = Plain<DamageReportModel>

export const title: keyof DamageReport = 'description'
