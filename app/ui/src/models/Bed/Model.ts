import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { WardModel } from '@/models/Ward/Model'
import type { AdmissionModel } from '@/models/Admission/Model'

export interface BedStorePayload {
	bed_number: string
	type?: 'REGULAR' | 'ICU' | 'PEDIATRIC'
	status?: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'
	ward_id?: number
}

export interface BedUpdatePayload {
	bed_number?: string
	type?: 'REGULAR' | 'ICU' | 'PEDIATRIC'
	status?: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'
	ward_id?: number
}

export interface BedModel extends Model {
	id: Column<string | number>
	bed_number: Column<string>
	type?: Column<'REGULAR' | 'ICU' | 'PEDIATRIC'>
	status?: Column<'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE'>
	ward_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	ward?: Relation<WardModel>
	admissions?: Relation<AdmissionModel>
}

export type Bed = Plain<BedModel>

export const title: keyof Bed = 'bed_number'
