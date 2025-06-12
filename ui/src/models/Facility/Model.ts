import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { EquipmentModel } from '@/models/Equipment/Model'
import type { SessionModel } from '@/models/Session/Model'

export interface FacilityStorePayload {
	name: string
	address: string
	description?: string
}

export interface FacilityUpdatePayload {
	name?: string
	address?: string
	description?: string
}

export interface FacilityModel extends Model {
	id: Column<string | number>
	name: Column<string>
	address: Column<string>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	equipment?: Relation<EquipmentModel>
	sessions?: Relation<SessionModel>
}

export type Facility = Plain<FacilityModel>

export const title: keyof Facility = 'name'
