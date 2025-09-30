import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SupplierModel } from '@/models/Supplier/Model'
import type { PurchaseOrderItemModel } from '@/models/PurchaseOrderItem/Model'

export interface PurchaseOrderStorePayload {
	order_date: string
	expected_delivery: string
	status: string
	total_amount: number
	supplier_id?: number
}

export interface PurchaseOrderUpdatePayload {
	order_date?: string
	expected_delivery?: string
	status?: string
	total_amount?: number
	supplier_id?: number
}

export interface PurchaseOrderModel extends Model {
	id: Column<string | number>
	order_date: Column<string>
	expected_delivery: Column<string>
	status: Column<string>
	total_amount: Column<number>
	supplier_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	supplier?: Relation<SupplierModel>
	purchaseOrderItems?: Relation<PurchaseOrderItemModel>
}

export type PurchaseOrder = Plain<PurchaseOrderModel>

export const title: keyof PurchaseOrder = 'status'
