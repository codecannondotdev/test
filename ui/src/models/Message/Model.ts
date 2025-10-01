import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'

export interface MessageStorePayload {
	subject?: string
	body: string
	sent_at?: string
	patient_id?: number
}

export interface MessageUpdatePayload {
	subject?: string
	body?: string
	sent_at?: string
	patient_id?: number
}

export interface MessageModel extends Model {
	id: Column<string | number>
	subject?: Column<string>
	body: Column<string>
	sent_at?: Column<string>
	patient_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
}

export type Message = Plain<MessageModel>

export const title: keyof Message = 'subject'
