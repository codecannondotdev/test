import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { QueueModel } from '@/models/Queue/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'

export interface WaitingListStorePayload {
	position?: number
	added_at: string
	notes?: string
	patient_id?: number
	appointment_id?: number
	queue_id?: number
}

export interface WaitingListUpdatePayload {
	position?: number
	added_at?: string
	notes?: string
	patient_id?: number
	appointment_id?: number
	queue_id?: number
}

export interface WaitingListModel extends Model {
	id: Column<string | number>
	position?: Column<number>
	added_at: Column<string>
	notes?: Column<string>
	patient_id?: Column<number>
	appointment_id?: Column<number>
	queue_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	queue?: Relation<QueueModel>
	appointment?: Relation<AppointmentModel>
}

export type WaitingList = Plain<WaitingListModel>

export const title: keyof WaitingList = 'position'
