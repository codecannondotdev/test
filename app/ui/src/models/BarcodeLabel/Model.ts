import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SpecimenModel } from '@/models/Specimen/Model'
import type { MedicationModel } from '@/models/Medication/Model'
import type { DeviceModel } from '@/models/Device/Model'

export interface BarcodeLabelStorePayload {
	code: string
	type?: 'SPECIMEN' | 'MEDICATION' | 'DEVICE'
	printed_at?: string
	medication_id?: number
	device_id?: number
	specimen_id?: number
}

export interface BarcodeLabelUpdatePayload {
	code?: string
	type?: 'SPECIMEN' | 'MEDICATION' | 'DEVICE'
	printed_at?: string
	medication_id?: number
	device_id?: number
	specimen_id?: number
}

export interface BarcodeLabelModel extends Model {
	id: Column<string | number>
	code: Column<string>
	type?: Column<'SPECIMEN' | 'MEDICATION' | 'DEVICE'>
	printed_at?: Column<string>
	medication_id?: Column<number>
	device_id?: Column<number>
	specimen_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	specimen?: Relation<SpecimenModel>
	medication?: Relation<MedicationModel>
	device?: Relation<DeviceModel>
}

export type BarcodeLabel = Plain<BarcodeLabelModel>

export const title: keyof BarcodeLabel = 'code'
