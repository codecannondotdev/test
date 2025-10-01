import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShiftAssignmentModel } from '@/models/ShiftAssignment/Model'
import type { RoomModel } from '@/models/Room/Model'

export interface ScheduleStorePayload {
	name: string
	effective_from?: string
	effective_to?: string
}

export interface ScheduleUpdatePayload {
	name?: string
	effective_from?: string
	effective_to?: string
}

export interface ScheduleModel extends Model {
	id: Column<string | number>
	name: Column<string>
	effective_from?: Column<string>
	effective_to?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	shiftAssignments?: Relation<ShiftAssignmentModel>
	rooms?: Relation<RoomModel>
}

export type Schedule = Plain<ScheduleModel>

export const title: keyof Schedule = 'name'
