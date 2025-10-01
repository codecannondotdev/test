import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'

export interface TelemedicineSessionStorePayload {
	platform: string
	session_link?: string
	start_time: string
	end_time: string
	appointment_id?: number
}

export interface TelemedicineSessionUpdatePayload {
	platform?: string
	session_link?: string
	start_time?: string
	end_time?: string
	appointment_id?: number
}

export interface TelemedicineSessionModel extends Model {
	id: Column<string | number>
	platform: Column<string>
	session_link?: Column<string>
	start_time: Column<string>
	end_time: Column<string>
	appointment_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	appointment?: Relation<AppointmentModel>
}

export type TelemedicineSession = Plain<TelemedicineSessionModel>

export const title: keyof TelemedicineSession = 'start_time'
