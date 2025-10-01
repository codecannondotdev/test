import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { FacilityModel } from '@/models/Facility/Model'
import type { HomeCareVisitModel } from '@/models/HomeCareVisit/Model'

export interface GeoLocationStorePayload {
	latitude: number
	longitude: number
	description?: string
	facility_id?: number
}

export interface GeoLocationUpdatePayload {
	latitude?: number
	longitude?: number
	description?: string
	facility_id?: number
}

export interface GeoLocationModel extends Model {
	id: Column<string | number>
	latitude: Column<number>
	longitude: Column<number>
	description?: Column<string>
	facility_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	facility?: Relation<FacilityModel>
	homeCareVisits?: Relation<HomeCareVisitModel>
}

export type GeoLocation = Plain<GeoLocationModel>

export const title: keyof GeoLocation = 'latitude'
