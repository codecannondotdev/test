import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'

export interface AppointmentTypeStorePayload {
	name: string
	default_duration: number
	default_location?: string
}

export interface AppointmentTypeUpdatePayload {
	name?: string
	default_duration?: number
	default_location?: string
}

export interface AppointmentTypeModel extends Model {
	id: Column<string | number>
	name: Column<string>
	default_duration: Column<number>
	default_location?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	appointments?: Relation<AppointmentModel>
}

export type AppointmentType = Plain<AppointmentTypeModel>

export const title: keyof AppointmentType = 'name'
