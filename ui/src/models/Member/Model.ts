import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { BookingModel } from '@/models/Booking/Model'
import type { SubscriptionModel } from '@/models/Subscription/Model'
import type { PaymentModel } from '@/models/Payment/Model'

export interface MemberStorePayload {
	first_name: string
	last_name: string
	email: string
	phone_number?: string
	membership_start_date: string
}

export interface MemberUpdatePayload {
	first_name?: string
	last_name?: string
	email?: string
	phone_number?: string
	membership_start_date?: string
}

export interface MemberModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	email: Column<string>
	phone_number?: Column<string>
	membership_start_date: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	bookings?: Relation<BookingModel>
	subscriptions?: Relation<SubscriptionModel>
	payments?: Relation<PaymentModel>
}

export type Member = Plain<MemberModel>

export const title: keyof Member = 'first_name'
