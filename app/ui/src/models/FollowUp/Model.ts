import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { ScreeningModel } from '@/models/Screening/Model'

export interface FollowUpStorePayload {
	follow_up_interval: string
	instructions?: string
	appointment_id?: number
	screening_id?: number
}

export interface FollowUpUpdatePayload {
	follow_up_interval?: string
	instructions?: string
	appointment_id?: number
	screening_id?: number
}

export interface FollowUpModel extends Model {
	id: Column<string | number>
	follow_up_interval: Column<string>
	instructions?: Column<string>
	appointment_id?: Column<number>
	screening_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	appointment?: Relation<AppointmentModel>
	screening?: Relation<ScreeningModel>
}

export type FollowUp = Plain<FollowUpModel>

export const title: keyof FollowUp = 'follow_up_interval'
