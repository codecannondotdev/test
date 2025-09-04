import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MemberModel } from '@/models/Member/Model'
import type { ClassModelModel } from '@/models/ClassModel/Model'

export interface BookingStorePayload {
	booking_date: string
	status: 'PENDING' | 'CONFIRMED' | 'CANCELED'
	member_id?: number
	class_id?: number
}

export interface BookingUpdatePayload {
	booking_date?: string
	status?: 'PENDING' | 'CONFIRMED' | 'CANCELED'
	member_id?: number
	class_id?: number
}

export interface BookingModel extends Model {
	id: Column<string | number>
	booking_date: Column<string>
	status: Column<'PENDING' | 'CONFIRMED' | 'CANCELED'>
	member_id?: Column<number>
	class_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<MemberModel>
	class?: Relation<ClassModelModel>
}

export type Booking = Plain<BookingModel>

export const title: keyof Booking = 'booking_date'
