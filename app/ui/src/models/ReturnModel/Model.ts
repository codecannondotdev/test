import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { OrderModel } from '@/models/Order/Model'
import type { CustomerModel } from '@/models/Customer/Model'
import type { ProductModel } from '@/models/Product/Model'

export interface ReturnModelStorePayload {
	return_date: string
	reason: string
	condition?: string
	customer_id?: number
	order_id?: number
}

export interface ReturnModelUpdatePayload {
	return_date?: string
	reason?: string
	condition?: string
	customer_id?: number
	order_id?: number
}

export interface ReturnModelModel extends Model {
	id: Column<string | number>
	return_date: Column<string>
	reason: Column<string>
	condition?: Column<string>
	customer_id?: Column<number>
	order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	order?: Relation<OrderModel>
	customer?: Relation<CustomerModel>
	product?: Relation<ProductModel>
}

export type ReturnModel = Plain<ReturnModelModel>

export const title: keyof ReturnModel = 'reason'
