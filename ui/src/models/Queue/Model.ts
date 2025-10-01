import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { WaitingListModel } from '@/models/WaitingList/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'

export interface QueueStorePayload {
	name: string
	location?: string
}

export interface QueueUpdatePayload {
	name?: string
	location?: string
}

export interface QueueModel extends Model {
	id: Column<string | number>
	name: Column<string>
	location?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	waitingEntries?: Relation<WaitingListModel>
	appointments?: Relation<AppointmentModel>
}

export type Queue = Plain<QueueModel>

export const title: keyof Queue = 'name'
