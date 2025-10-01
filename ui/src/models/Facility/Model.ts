import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DepartmentModel } from '@/models/Department/Model'
import type { GeoLocationModel } from '@/models/GeoLocation/Model'
import type { RoomModel } from '@/models/Room/Model'

export interface FacilityStorePayload {
	name: string
	address?: string
	type?: 'Main Hospital' | 'Clinic' | 'Lab'
}

export interface FacilityUpdatePayload {
	name?: string
	address?: string
	type?: 'Main Hospital' | 'Clinic' | 'Lab'
}

export interface FacilityModel extends Model {
	id: Column<string | number>
	name: Column<string>
	address?: Column<string>
	type?: Column<'Main Hospital' | 'Clinic' | 'Lab'>
	created_at: Column<string>
	updated_at: Column<string>
	departments?: Relation<DepartmentModel>
	geoLocations?: Relation<GeoLocationModel>
	rooms?: Relation<RoomModel>
}

export type Facility = Plain<FacilityModel>

export const title: keyof Facility = 'name'
