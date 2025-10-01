import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProcurementOrderModel } from '@/models/ProcurementOrder/Model'

export interface MedicationStockStorePayload {
	batch_number?: string
	expiry_date?: string
	quantity_available: number
}

export interface MedicationStockUpdatePayload {
	batch_number?: string
	expiry_date?: string
	quantity_available?: number
}

export interface MedicationStockModel extends Model {
	id: Column<string | number>
	batch_number?: Column<string>
	expiry_date?: Column<string>
	quantity_available: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	procurements?: Relation<ProcurementOrderModel>
}

export type MedicationStock = Plain<MedicationStockModel>

export const title: keyof MedicationStock = 'batch_number'
