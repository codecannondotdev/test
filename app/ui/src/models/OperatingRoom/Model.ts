import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SurgeryModel } from '@/models/Surgery/Model'
import type { DeviceModel } from '@/models/Device/Model'

export interface OperatingRoomStorePayload {
	room_number: string
	status?: 'Available' | 'In Use' | 'Maintenance'
	equipment_list?: string
}

export interface OperatingRoomUpdatePayload {
	room_number?: string
	status?: 'Available' | 'In Use' | 'Maintenance'
	equipment_list?: string
}

export interface OperatingRoomModel extends Model {
	id: Column<string | number>
	room_number: Column<string>
	status?: Column<'Available' | 'In Use' | 'Maintenance'>
	equipment_list?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	surgeries?: Relation<SurgeryModel>
	anesthesiaMachines?: Relation<DeviceModel>
}

export type OperatingRoom = Plain<OperatingRoomModel>

export const title: keyof OperatingRoom = 'room_number'
