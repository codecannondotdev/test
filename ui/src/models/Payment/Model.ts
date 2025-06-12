import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MemberModel } from '@/models/Member/Model'
import type { SubscriptionModel } from '@/models/Subscription/Model'

export interface PaymentStorePayload {
	amount: string
	payment_date: string
	payment_method?: 'CREDIT CARD' | 'CASH' | 'BANK TRANSFER'
	note?: string
	member_id?: number
	subscription_id?: number
}

export interface PaymentUpdatePayload {
	amount?: string
	payment_date?: string
	payment_method?: 'CREDIT CARD' | 'CASH' | 'BANK TRANSFER'
	note?: string
	member_id?: number
	subscription_id?: number
}

export interface PaymentModel extends Model {
	id: Column<string | number>
	amount: Column<string>
	payment_date: Column<string>
	payment_method?: Column<'CREDIT CARD' | 'CASH' | 'BANK TRANSFER'>
	note?: Column<string>
	member_id?: Column<number>
	subscription_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<MemberModel>
	subscription?: Relation<SubscriptionModel>
}

export type Payment = Plain<PaymentModel>

export const title: keyof Payment = 'amount'
