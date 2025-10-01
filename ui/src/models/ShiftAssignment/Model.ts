import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShiftModel } from '@/models/Shift/Model'
import type { NurseModel } from '@/models/Nurse/Model'
import type { ScheduleModel } from '@/models/Schedule/Model'
import type { AttendanceModel } from '@/models/Attendance/Model'

export interface ShiftAssignmentStorePayload {
	assignment_date: string
	role?: string
	notes?: string
	nurse_id?: number
	shift_id?: number
	schedule_id?: number
}

export interface ShiftAssignmentUpdatePayload {
	assignment_date?: string
	role?: string
	notes?: string
	nurse_id?: number
	shift_id?: number
	schedule_id?: number
}

export interface ShiftAssignmentModel extends Model {
	id: Column<string | number>
	assignment_date: Column<string>
	role?: Column<string>
	notes?: Column<string>
	nurse_id?: Column<number>
	shift_id?: Column<number>
	schedule_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	shift?: Relation<ShiftModel>
	nurse?: Relation<NurseModel>
	schedule?: Relation<ScheduleModel>
	attendances?: Relation<AttendanceModel>
}

export type ShiftAssignment = Plain<ShiftAssignmentModel>

export const title: keyof ShiftAssignment = 'assignment_date'
