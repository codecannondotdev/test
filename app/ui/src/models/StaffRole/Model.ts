import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShiftModel } from '@/models/Shift/Model'

export interface StaffRoleStorePayload {
	title: string
	description?: string
}

export interface StaffRoleUpdatePayload {
	title?: string
	description?: string
}

export interface StaffRoleModel extends Model {
	id: Column<string | number>
	title: Column<string>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	shifts?: Relation<ShiftModel>
}

export type StaffRole = Plain<StaffRoleModel>

export const title: keyof StaffRole = 'title'
