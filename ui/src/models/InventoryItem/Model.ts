import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SupplierModel } from '@/models/Supplier/Model'
import type { MedicationModel } from '@/models/Medication/Model'
import type { ProcurementOrderModel } from '@/models/ProcurementOrder/Model'

export interface InventoryItemStorePayload {
	name: string
	category?: string
	quantity?: number
	reorder_level?: number
	medication_id?: number
	supplier_id?: number
	procurement_order_id?: number
}

export interface InventoryItemUpdatePayload {
	name?: string
	category?: string
	quantity?: number
	reorder_level?: number
	medication_id?: number
	supplier_id?: number
	procurement_order_id?: number
}

export interface InventoryItemModel extends Model {
	id: Column<string | number>
	name: Column<string>
	category?: Column<string>
	quantity?: Column<number>
	reorder_level?: Column<number>
	medication_id?: Column<number>
	supplier_id?: Column<number>
	procurement_order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	supplier?: Relation<SupplierModel>
	medication?: Relation<MedicationModel>
	procurementOrder?: Relation<ProcurementOrderModel>
}

export type InventoryItem = Plain<InventoryItemModel>

export const title: keyof InventoryItem = 'name'
