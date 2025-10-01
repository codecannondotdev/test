import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DeviceModel } from '@/models/Device/Model'
import type { SupplierModel } from '@/models/Supplier/Model'

export interface MedicalDeviceMaintenanceStorePayload {
	maintenance_date: string
	performed_by?: string
	notes?: string
	supplier_id?: number
	device_id?: number
}

export interface MedicalDeviceMaintenanceUpdatePayload {
	maintenance_date?: string
	performed_by?: string
	notes?: string
	supplier_id?: number
	device_id?: number
}

export interface MedicalDeviceMaintenanceModel extends Model {
	id: Column<string | number>
	maintenance_date: Column<string>
	performed_by?: Column<string>
	notes?: Column<string>
	supplier_id?: Column<number>
	device_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	device?: Relation<DeviceModel>
	supplier?: Relation<SupplierModel>
}

export type MedicalDeviceMaintenance = Plain<MedicalDeviceMaintenanceModel>

export const title: keyof MedicalDeviceMaintenance = 'maintenance_date'
