import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { OrderModel } from '@/models/Order/Model'
import type { ProductModel } from '@/models/Product/Model'

export interface OrderItemStorePayload {
	item_name: string
	quantity: number
	unit_price: number
	product_id?: number
	order_id?: number
}

export interface OrderItemUpdatePayload {
	item_name?: string
	quantity?: number
	unit_price?: number
	product_id?: number
	order_id?: number
}

export interface OrderItemModel extends Model {
	id: Column<string | number>
	item_name: Column<string>
	quantity: Column<number>
	unit_price: Column<number>
	product_id?: Column<number>
	order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	order?: Relation<OrderModel>
	product?: Relation<ProductModel>
}

export type OrderItem = Plain<OrderItemModel>

export const title: keyof OrderItem = 'item_name'
