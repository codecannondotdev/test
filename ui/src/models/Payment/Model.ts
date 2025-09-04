import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MemberModel } from '@/models/Member/Model'

export interface PaymentStorePayload {
	amount: number
	payment_date: string
	payment_method: 'CASH' | 'CREDIT CARD' | 'DEBIT CARD'
	member_id?: number
}

export interface PaymentUpdatePayload {
	amount?: number
	payment_date?: string
	payment_method?: 'CASH' | 'CREDIT CARD' | 'DEBIT CARD'
	member_id?: number
}

export interface PaymentModel extends Model {
	id: Column<string | number>
	amount: Column<number>
	payment_date: Column<string>
	payment_method: Column<'CASH' | 'CREDIT CARD' | 'DEBIT CARD'>
	member_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<MemberModel>
}

export type Payment = Plain<PaymentModel>

export const title: keyof Payment = 'amount'
