import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProductModel } from '@/models/Product/Model'
import type { WarehouseModel } from '@/models/Warehouse/Model'

export interface InventoryStorePayload {
	item_name: string
	stock_quantity: number
	reorder_level?: number
	last_updated?: string
	product_id?: number
	warehouse_id?: number
}

export interface InventoryUpdatePayload {
	item_name?: string
	stock_quantity?: number
	reorder_level?: number
	last_updated?: string
	product_id?: number
	warehouse_id?: number
}

export interface InventoryModel extends Model {
	id: Column<string | number>
	item_name: Column<string>
	stock_quantity: Column<number>
	reorder_level?: Column<number>
	last_updated?: Column<string>
	product_id?: Column<number>
	warehouse_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	product?: Relation<ProductModel>
	warehouse?: Relation<WarehouseModel>
}

export type Inventory = Plain<InventoryModel>

export const title: keyof Inventory = 'item_name'
