import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShiftAssignmentModel } from '@/models/ShiftAssignment/Model'

export interface AttendanceStorePayload {
	date: string
	status?: 'Present' | 'Absent' | 'Late'
	notes?: string
	shift_assignment_id?: number
}

export interface AttendanceUpdatePayload {
	date?: string
	status?: 'Present' | 'Absent' | 'Late'
	notes?: string
	shift_assignment_id?: number
}

export interface AttendanceModel extends Model {
	id: Column<string | number>
	date: Column<string>
	status?: Column<'Present' | 'Absent' | 'Late'>
	notes?: Column<string>
	shift_assignment_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	shiftAssignment?: Relation<ShiftAssignmentModel>
}

export type Attendance = Plain<AttendanceModel>

export const title: keyof Attendance = 'date'
