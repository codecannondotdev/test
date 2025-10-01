import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShiftAssignmentModel } from '@/models/ShiftAssignment/Model'
import type { StaffRoleModel } from '@/models/StaffRole/Model'

export interface ShiftStorePayload {
	name: string
	start_time: string
	end_time: string
}

export interface ShiftUpdatePayload {
	name?: string
	start_time?: string
	end_time?: string
}

export interface ShiftModel extends Model {
	id: Column<string | number>
	name: Column<string>
	start_time: Column<string>
	end_time: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	assignments?: Relation<ShiftAssignmentModel>
	staffRoles?: Relation<StaffRoleModel>
}

export type Shift = Plain<ShiftModel>

export const title: keyof Shift = 'name'
