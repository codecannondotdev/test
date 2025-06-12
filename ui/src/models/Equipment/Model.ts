import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { FacilityModel } from '@/models/Facility/Model'

export interface EquipmentStorePayload {
	name: string
	description?: string
	status?: 'AVAILABLE' | 'IN USE' | 'MAINTENANCE'
	facility_id?: number
}

export interface EquipmentUpdatePayload {
	name?: string
	description?: string
	status?: 'AVAILABLE' | 'IN USE' | 'MAINTENANCE'
	facility_id?: number
}

export interface EquipmentModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	status?: Column<'AVAILABLE' | 'IN USE' | 'MAINTENANCE'>
	facility_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	facility?: Relation<FacilityModel>
}

export type Equipment = Plain<EquipmentModel>

export const title: keyof Equipment = 'name'
