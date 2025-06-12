import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MemberModel } from '@/models/Member/Model'
import type { PaymentModel } from '@/models/Payment/Model'

export interface SubscriptionStorePayload {
	type?: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
	start_date: string
	end_date?: string
	status?: 'ACTIVE' | 'INACTIVE' | 'CANCELLED'
	member_id?: number
}

export interface SubscriptionUpdatePayload {
	type?: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
	start_date?: string
	end_date?: string
	status?: 'ACTIVE' | 'INACTIVE' | 'CANCELLED'
	member_id?: number
}

export interface SubscriptionModel extends Model {
	id: Column<string | number>
	type?: Column<'MONTHLY' | 'QUARTERLY' | 'ANNUAL'>
	start_date: Column<string>
	end_date?: Column<string>
	status?: Column<'ACTIVE' | 'INACTIVE' | 'CANCELLED'>
	member_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<MemberModel>
	payments?: Relation<PaymentModel>
}

export type Subscription = Plain<SubscriptionModel>

export const title: keyof Subscription = 'type'
