import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PurchaseOrderModel } from '@/models/PurchaseOrder/Model'
import type { ProductModel } from '@/models/Product/Model'

export interface PurchaseOrderItemStorePayload {
	item_description: string
	quantity: number
	unit_cost: number
	product_id?: number
	purchase_order_id?: number
}

export interface PurchaseOrderItemUpdatePayload {
	item_description?: string
	quantity?: number
	unit_cost?: number
	product_id?: number
	purchase_order_id?: number
}

export interface PurchaseOrderItemModel extends Model {
	id: Column<string | number>
	item_description: Column<string>
	quantity: Column<number>
	unit_cost: Column<number>
	product_id?: Column<number>
	purchase_order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	purchaseOrder?: Relation<PurchaseOrderModel>
	product?: Relation<ProductModel>
}

export type PurchaseOrderItem = Plain<PurchaseOrderItemModel>

export const title: keyof PurchaseOrderItem = 'item_description'
