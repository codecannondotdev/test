import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SupplierModel } from '@/models/Supplier/Model'
import type { MaterialModel } from '@/models/Material/Model'

export interface PurchaseOrderStorePayload {
	order_number: string
	order_date: string
	quantity_ordered: number
	unit_price: number
	total_cost: number
	material_id?: number
	supplier_id?: number
	status: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED'
}

export interface PurchaseOrderUpdatePayload {
	order_number?: string
	order_date?: string
	quantity_ordered?: number
	unit_price?: number
	total_cost?: number
	material_id?: number
	supplier_id?: number
	status?: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED'
}

export interface PurchaseOrderModel extends Model {
	id: Column<string | number>
	order_number: Column<string>
	order_date: Column<string>
	quantity_ordered: Column<number>
	unit_price: Column<number>
	total_cost: Column<number>
	material_id?: Column<number>
	supplier_id?: Column<number>
	status: Column<'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED'>
	created_at: Column<string>
	updated_at: Column<string>
	supplier?: Relation<SupplierModel>
	material?: Relation<MaterialModel>
}

export type PurchaseOrder = Plain<PurchaseOrderModel>

export const title: keyof PurchaseOrder = 'order_number'
