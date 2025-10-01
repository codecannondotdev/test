import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { OperatingRoomModel } from '@/models/OperatingRoom/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { AnesthesiaModel } from '@/models/Anesthesia/Model'
import type { ProcedureModel } from '@/models/Procedure/Model'

export interface SurgeryStorePayload {
	procedure_name: string
	scheduled_start: string
	scheduled_end?: string
	status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'
	patient_id?: number
	operating_room_id?: number
}

export interface SurgeryUpdatePayload {
	procedure_name?: string
	scheduled_start?: string
	scheduled_end?: string
	status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'
	patient_id?: number
	operating_room_id?: number
}

export interface SurgeryModel extends Model {
	id: Column<string | number>
	procedure_name: Column<string>
	scheduled_start: Column<string>
	scheduled_end?: Column<string>
	status?: Column<'SCHEDULED' | 'COMPLETED' | 'CANCELLED'>
	patient_id?: Column<number>
	operating_room_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	operatingRoom?: Relation<OperatingRoomModel>
	surgeons?: Relation<DoctorModel>
	anesthesiaRecord?: Relation<AnesthesiaModel>
	procedures?: Relation<ProcedureModel>
}

export type Surgery = Plain<SurgeryModel>

export const title: keyof Surgery = 'procedure_name'
