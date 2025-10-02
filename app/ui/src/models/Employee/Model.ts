import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { RoleModel } from '@/models/Role/Model'
import type { TransactionModel } from '@/models/Transaction/Model'
import type { DamageReportModel } from '@/models/DamageReport/Model'

export interface EmployeeStorePayload {
	first_name: string
	last_name: string
	email: string
	job_title: string
	role_id?: number
}

export interface EmployeeUpdatePayload {
	first_name?: string
	last_name?: string
	email?: string
	job_title?: string
	role_id?: number
}

export interface EmployeeModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	email: Column<string>
	job_title: Column<string>
	role_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	role?: Relation<RoleModel>
	transactions?: Relation<TransactionModel>
	damageReports?: Relation<DamageReportModel>
}

export type Employee = Plain<EmployeeModel>

export const title: keyof Employee = 'first_name'
