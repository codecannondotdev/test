import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProcurementOrderModel } from '@/models/ProcurementOrder/Model'
import type { InventoryItemModel } from '@/models/InventoryItem/Model'
import type { MedicalDeviceMaintenanceModel } from '@/models/MedicalDeviceMaintenance/Model'

export interface SupplierStorePayload {
	name: string
	contact_person?: string
	phone?: string
	email?: string
}

export interface SupplierUpdatePayload {
	name?: string
	contact_person?: string
	phone?: string
	email?: string
}

export interface SupplierModel extends Model {
	id: Column<string | number>
	name: Column<string>
	contact_person?: Column<string>
	phone?: Column<string>
	email?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	procurements?: Relation<ProcurementOrderModel>
	inventoryItems?: Relation<InventoryItemModel>
	maintenanceRecords?: Relation<MedicalDeviceMaintenanceModel>
}

export type Supplier = Plain<SupplierModel>

export const title: keyof Supplier = 'name'
