import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SpecimenModel } from '@/models/Specimen/Model'

export interface SampleStorePayload {
	sample_type: string
	collection_time: string
	condition?: string
	specimen_id?: number
}

export interface SampleUpdatePayload {
	sample_type?: string
	collection_time?: string
	condition?: string
	specimen_id?: number
}

export interface SampleModel extends Model {
	id: Column<string | number>
	sample_type: Column<string>
	collection_time: Column<string>
	condition?: Column<string>
	specimen_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	specimen?: Relation<SpecimenModel>
}

export type Sample = Plain<SampleModel>

export const title: keyof Sample = 'sample_type'
