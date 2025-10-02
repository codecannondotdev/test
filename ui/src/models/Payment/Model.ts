import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { OrderModel } from '@/models/Order/Model'
import type { CustomerModel } from '@/models/Customer/Model'

export interface PaymentStorePayload {
	payment_date: string
	amount: number
	payment_method: string
	customer_id?: number
	order_id?: number
}

export interface PaymentUpdatePayload {
	payment_date?: string
	amount?: number
	payment_method?: string
	customer_id?: number
	order_id?: number
}

export interface PaymentModel extends Model {
	id: Column<string | number>
	payment_date: Column<string>
	amount: Column<number>
	payment_method: Column<string>
	customer_id?: Column<number>
	order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	order?: Relation<OrderModel>
	customer?: Relation<CustomerModel>
}

export type Payment = Plain<PaymentModel>

export const title: keyof Payment = 'payment_date'
