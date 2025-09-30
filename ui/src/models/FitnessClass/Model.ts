import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { TrainerModel } from '@/models/Trainer/Model'
import type { AsdfasdfasdModel } from '@/models/Asdfasdfasd/Model'
import type { BookingModel } from '@/models/Booking/Model'

export interface FitnessClassStorePayload {
	name: string
	description: string
	schedule: string
	duration_minutes?: number
	trainer_id?: number
}

export interface FitnessClassUpdatePayload {
	name?: string
	description?: string
	schedule?: string
	duration_minutes?: number
	trainer_id?: number
}

export interface FitnessClassModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description: Column<string>
	schedule: Column<string>
	duration_minutes?: Column<number>
	trainer_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	trainer?: Relation<TrainerModel>
	attendees?: Relation<AsdfasdfasdModel>
	bookings?: Relation<BookingModel>
}

export type FitnessClass = Plain<FitnessClassModel>

export const title: keyof FitnessClass = 'name'
