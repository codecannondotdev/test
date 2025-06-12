import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ClassModelModel } from '@/models/ClassModel/Model'
import type { TrainerModel } from '@/models/Trainer/Model'
import type { ScheduleModel } from '@/models/Schedule/Model'
import type { FacilityModel } from '@/models/Facility/Model'
import type { BookingModel } from '@/models/Booking/Model'

export interface SessionStorePayload {
	date: string
	start_time: string
	end_time: string
	capacity: number
	trainer_id?: number
	fitness_class_id?: number
	schedule_id?: number
	facility_id?: number
}

export interface SessionUpdatePayload {
	date?: string
	start_time?: string
	end_time?: string
	capacity?: number
	trainer_id?: number
	fitness_class_id?: number
	schedule_id?: number
	facility_id?: number
}

export interface SessionModel extends Model {
	id: Column<string | number>
	date: Column<string>
	start_time: Column<string>
	end_time: Column<string>
	capacity: Column<number>
	trainer_id?: Column<number>
	fitness_class_id?: Column<number>
	schedule_id?: Column<number>
	facility_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	fitnessClass?: Relation<ClassModelModel>
	trainer?: Relation<TrainerModel>
	schedule?: Relation<ScheduleModel>
	facility?: Relation<FacilityModel>
	bookings?: Relation<BookingModel>
}

export type Session = Plain<SessionModel>

export const title: keyof Session = 'date'
