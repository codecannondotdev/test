import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SurgeryModel } from '@/models/Surgery/Model'
import type { DoctorModel } from '@/models/Doctor/Model'

export interface AnesthesiaStorePayload {
	type?: 'General' | 'Regional' | 'Local'
	start_time?: string
	end_time?: string
	complications?: string
	anesthesiologist_id?: number
	surgery_id?: number
}

export interface AnesthesiaUpdatePayload {
	type?: 'General' | 'Regional' | 'Local'
	start_time?: string
	end_time?: string
	complications?: string
	anesthesiologist_id?: number
	surgery_id?: number
}

export interface AnesthesiaModel extends Model {
	id: Column<string | number>
	type?: Column<'General' | 'Regional' | 'Local'>
	start_time?: Column<string>
	end_time?: Column<string>
	complications?: Column<string>
	anesthesiologist_id?: Column<number>
	surgery_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	surgery?: Relation<SurgeryModel>
	anesthesiologist?: Relation<DoctorModel>
}

export type Anesthesia = Plain<AnesthesiaModel>

export const title: keyof Anesthesia = 'start_time'
