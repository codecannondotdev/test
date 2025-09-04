import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { EquipmentModel } from '@/models/Equipment/Model'
import type { ScheduleModel } from '@/models/Schedule/Model'

export interface StudioStorePayload {
	name: string
	location: string
	capacity: number
}

export interface StudioUpdatePayload {
	name?: string
	location?: string
	capacity?: number
}

export interface StudioModel extends Model {
	id: Column<string | number>
	name: Column<string>
	location: Column<string>
	capacity: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	equipments?: Relation<EquipmentModel>
	schedules?: Relation<ScheduleModel>
}

export type Studio = Plain<StudioModel>

export const title: keyof Studio = 'name'
