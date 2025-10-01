import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SupplierModel } from '@/models/Supplier/Model'
import type { InventoryItemModel } from '@/models/InventoryItem/Model'
import type { MedicationStockModel } from '@/models/MedicationStock/Model'
import type { DonorModel } from '@/models/Donor/Model'

export interface ProcurementOrderStorePayload {
	order_number: string
	order_date?: string
	status?: 'Ordered' | 'Received' | 'Cancelled'
	stock_id?: number
	supplier_id?: number
	donor_id?: number
}

export interface ProcurementOrderUpdatePayload {
	order_number?: string
	order_date?: string
	status?: 'Ordered' | 'Received' | 'Cancelled'
	stock_id?: number
	supplier_id?: number
	donor_id?: number
}

export interface ProcurementOrderModel extends Model {
	id: Column<string | number>
	order_number: Column<string>
	order_date?: Column<string>
	status?: Column<'Ordered' | 'Received' | 'Cancelled'>
	stock_id?: Column<number>
	supplier_id?: Column<number>
	donor_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	supplier?: Relation<SupplierModel>
	items?: Relation<InventoryItemModel>
	stock?: Relation<MedicationStockModel>
	donor?: Relation<DonorModel>
}

export type ProcurementOrder = Plain<ProcurementOrderModel>

export const title: keyof ProcurementOrder = 'order_number'
