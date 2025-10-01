import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { GeoLocationModel } from '@/models/GeoLocation/Model'

export interface HomeCareVisitStorePayload {
	visit_date: string
	services_provided?: string
	distance_travelled?: string
	patient_id?: number
	geo_location_id?: number
}

export interface HomeCareVisitUpdatePayload {
	visit_date?: string
	services_provided?: string
	distance_travelled?: string
	patient_id?: number
	geo_location_id?: number
}

export interface HomeCareVisitModel extends Model {
	id: Column<string | number>
	visit_date: Column<string>
	services_provided?: Column<string>
	distance_travelled?: Column<string>
	patient_id?: Column<number>
	geo_location_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	geoLocation?: Relation<GeoLocationModel>
}

export type HomeCareVisit = Plain<HomeCareVisitModel>

export const title: keyof HomeCareVisit = 'visit_date'
