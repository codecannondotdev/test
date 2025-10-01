import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { WardModel } from '@/models/Ward/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { ScheduleModel } from '@/models/Schedule/Model'
import type { FacilityModel } from '@/models/Facility/Model'

export interface RoomStorePayload {
	room_number: string
	type?: 'Clinic' | 'Operating' | 'Recovery' | 'Consultation'
	capacity?: number
	facility_id?: number
}

export interface RoomUpdatePayload {
	room_number?: string
	type?: 'Clinic' | 'Operating' | 'Recovery' | 'Consultation'
	capacity?: number
	facility_id?: number
}

export interface RoomModel extends Model {
	id: Column<string | number>
	room_number: Column<string>
	type?: Column<'Clinic' | 'Operating' | 'Recovery' | 'Consultation'>
	capacity?: Column<number>
	facility_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	wards?: Relation<WardModel>
	appointments?: Relation<AppointmentModel>
	schedules?: Relation<ScheduleModel>
	facility?: Relation<FacilityModel>
}

export type Room = Plain<RoomModel>

export const title: keyof Room = 'room_number'
