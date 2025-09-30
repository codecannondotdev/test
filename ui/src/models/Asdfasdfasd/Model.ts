import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { BookingModel } from '@/models/Booking/Model'
import type { MembershipModel } from '@/models/Membership/Model'
import type { FitnessClassModel } from '@/models/FitnessClass/Model'

export interface AsdfasdfasdStorePayload {
	first_name: string
	last_name: string
	email: string
	phone_number?: string
	date_of_birth?: string
	boolean?: boolean
}

export interface AsdfasdfasdUpdatePayload {
	first_name?: string
	last_name?: string
	email?: string
	phone_number?: string
	date_of_birth?: string
	boolean?: boolean
}

export interface AsdfasdfasdModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	email: Column<string>
	phone_number?: Column<string>
	date_of_birth?: Column<string>
	boolean?: Column<boolean>
	created_at: Column<string>
	updated_at: Column<string>
	bookings?: Relation<BookingModel>
	memberships?: Relation<MembershipModel>
	attendedClasses?: Relation<FitnessClassModel>
}

export type Asdfasdfasd = Plain<AsdfasdfasdModel>

export const title: keyof Asdfasdfasd = 'first_name'
