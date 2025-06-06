import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SupplierModel } from '@/models/Supplier/Model'
import type { MiningOperationModel } from '@/models/MiningOperation/Model'
import type { PurchaseOrderModel } from '@/models/PurchaseOrder/Model'
import type { InventoryModel } from '@/models/Inventory/Model'

export interface MaterialStorePayload {
	name: string
	unit: 'TON' | 'KILOGRAM' | 'GRAM'
	grade: string
	description?: string
}

export interface MaterialUpdatePayload {
	name?: string
	unit?: 'TON' | 'KILOGRAM' | 'GRAM'
	grade?: string
	description?: string
}

export interface MaterialModel extends Model {
	id: Column<string | number>
	name: Column<string>
	unit: Column<'TON' | 'KILOGRAM' | 'GRAM'>
	grade: Column<string>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	suppliers?: Relation<SupplierModel>
	miningOperations?: Relation<MiningOperationModel>
	purchaseOrders?: Relation<PurchaseOrderModel>
	inventoryItems?: Relation<InventoryModel>
}

export type Material = Plain<MaterialModel>

export const title: keyof Material = 'name'
