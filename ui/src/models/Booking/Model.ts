import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MemberModel } from '@/models/Member/Model'
import type { SessionModel } from '@/models/Session/Model'

export interface BookingStorePayload {
	booking_date: string
	status?: 'CONFIRMED' | 'CANCELLED' | 'PENDING'
	member_id?: number
	session_id?: number
}

export interface BookingUpdatePayload {
	booking_date?: string
	status?: 'CONFIRMED' | 'CANCELLED' | 'PENDING'
	member_id?: number
	session_id?: number
}

export interface BookingModel extends Model {
	id: Column<string | number>
	booking_date: Column<string>
	status?: Column<'CONFIRMED' | 'CANCELLED' | 'PENDING'>
	member_id?: Column<number>
	session_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<MemberModel>
	session?: Relation<SessionModel>
}

export type Booking = Plain<BookingModel>

export const title: keyof Booking = 'booking_date'
