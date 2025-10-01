import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MedicalDeviceMaintenanceModel } from '@/models/MedicalDeviceMaintenance/Model'
import type { WardModel } from '@/models/Ward/Model'
import type { OperatingRoomModel } from '@/models/OperatingRoom/Model'
import type { BarcodeLabelModel } from '@/models/BarcodeLabel/Model'

export interface DeviceStorePayload {
	name: string
	model?: string
	serial_number?: string
	status?: 'ACTIVE' | 'MAINTENANCE' | 'DECOMMISSIONED'
	operating_room_id?: number
}

export interface DeviceUpdatePayload {
	name?: string
	model?: string
	serial_number?: string
	status?: 'ACTIVE' | 'MAINTENANCE' | 'DECOMMISSIONED'
	operating_room_id?: number
}

export interface DeviceModel extends Model {
	id: Column<string | number>
	name: Column<string>
	model?: Column<string>
	serial_number?: Column<string>
	status?: Column<'ACTIVE' | 'MAINTENANCE' | 'DECOMMISSIONED'>
	operating_room_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	maintenanceRecords?: Relation<MedicalDeviceMaintenanceModel>
	locations?: Relation<WardModel>
	operatingRoom?: Relation<OperatingRoomModel>
	barcodeLabels?: Relation<BarcodeLabelModel>
}

export type Device = Plain<DeviceModel>

export const title: keyof Device = 'name'
