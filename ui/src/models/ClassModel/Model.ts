import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ScheduleModel } from '@/models/Schedule/Model'
import type { BookingModel } from '@/models/Booking/Model'
import type { FeedbackModel } from '@/models/Feedback/Model'
import type { ProgramModel } from '@/models/Program/Model'
import type { InstructorModel } from '@/models/Instructor/Model'

export interface ClassModelStorePayload {
	title: string
	description?: string
	class_date: string
	capacity: number
	program_id?: number
	instructor_id?: number
}

export interface ClassModelUpdatePayload {
	title?: string
	description?: string
	class_date?: string
	capacity?: number
	program_id?: number
	instructor_id?: number
}

export interface ClassModelModel extends Model {
	id: Column<string | number>
	title: Column<string>
	description?: Column<string>
	class_date: Column<string>
	capacity: Column<number>
	program_id?: Column<number>
	instructor_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	schedules?: Relation<ScheduleModel>
	bookings?: Relation<BookingModel>
	feedbacks?: Relation<FeedbackModel>
	program?: Relation<ProgramModel>
	instructor?: Relation<InstructorModel>
}

export type ClassModel = Plain<ClassModelModel>

export const title: keyof ClassModel = 'title'
