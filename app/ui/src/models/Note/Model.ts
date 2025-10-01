import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MedicalRecordModel } from '@/models/MedicalRecord/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'

export interface NoteStorePayload {
	title?: string
	body?: string
	appointment_id?: number
	medical_record_id?: number
}

export interface NoteUpdatePayload {
	title?: string
	body?: string
	appointment_id?: number
	medical_record_id?: number
}

export interface NoteModel extends Model {
	id: Column<string | number>
	title?: Column<string>
	body?: Column<string>
	appointment_id?: Column<number>
	medical_record_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	medicalRecord?: Relation<MedicalRecordModel>
	appointment?: Relation<AppointmentModel>
}

export type Note = Plain<NoteModel>

export const title: keyof Note = 'title'
