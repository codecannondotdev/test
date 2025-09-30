import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AsdfasdfasdModel } from '@/models/Asdfasdfasd/Model'
import type { FitnessClassModel } from '@/models/FitnessClass/Model'

export interface BookingStorePayload {
	booking_date: string
	status?: 'CONFIRMED' | 'PENDING' | 'CANCELLED'
	member_id?: number
	fitness_class_id?: number
}

export interface BookingUpdatePayload {
	booking_date?: string
	status?: 'CONFIRMED' | 'PENDING' | 'CANCELLED'
	member_id?: number
	fitness_class_id?: number
}

export interface BookingModel extends Model {
	id: Column<string | number>
	booking_date: Column<string>
	status?: Column<'CONFIRMED' | 'PENDING' | 'CANCELLED'>
	member_id?: Column<number>
	fitness_class_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<AsdfasdfasdModel>
	fitnessClass?: Relation<FitnessClassModel>
}

export type Booking = Plain<BookingModel>

export const title: keyof Booking = 'booking_date'
