import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { CategoryModel } from '@/models/Category/Model'
import type { SupplierModel } from '@/models/Supplier/Model'
import type { InventoryModel } from '@/models/Inventory/Model'
import type { DamageReportModel } from '@/models/DamageReport/Model'
import type { OrderItemModel } from '@/models/OrderItem/Model'
import type { ShipmentItemModel } from '@/models/ShipmentItem/Model'
import type { PurchaseOrderItemModel } from '@/models/PurchaseOrderItem/Model'
import type { ReturnModelModel } from '@/models/ReturnModel/Model'

export interface ProductStorePayload {
	name: string
	weight?: number
	price: number
	description?: string
	dimensions?: string
	category_id?: number
	supplier_id?: number
}

export interface ProductUpdatePayload {
	name?: string
	weight?: number
	price?: number
	description?: string
	dimensions?: string
	category_id?: number
	supplier_id?: number
}

export interface ProductModel extends Model {
	id: Column<string | number>
	name: Column<string>
	weight?: Column<number>
	price: Column<number>
	description?: Column<string>
	dimensions?: Column<string>
	category_id?: Column<number>
	supplier_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	category?: Relation<CategoryModel>
	supplier?: Relation<SupplierModel>
	inventory?: Relation<InventoryModel>
	damageReports?: Relation<DamageReportModel>
	orderItems?: Relation<OrderItemModel>
	shipmentItems?: Relation<ShipmentItemModel>
	purchaseOrderItems?: Relation<PurchaseOrderItemModel>
	returns?: Relation<ReturnModelModel>
}

export type Product = Plain<ProductModel>

export const title: keyof Product = 'name'
