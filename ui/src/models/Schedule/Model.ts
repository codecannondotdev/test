import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { StudioModel } from '@/models/Studio/Model'
import type { ClassModelModel } from '@/models/ClassModel/Model'

export interface ScheduleStorePayload {
	day: string
	start_time: string
	end_time: string
	class_id?: number
	studio_id?: number
}

export interface ScheduleUpdatePayload {
	day?: string
	start_time?: string
	end_time?: string
	class_id?: number
	studio_id?: number
}

export interface ScheduleModel extends Model {
	id: Column<string | number>
	day: Column<string>
	start_time: Column<string>
	end_time: Column<string>
	class_id?: Column<number>
	studio_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	studio?: Relation<StudioModel>
	class?: Relation<ClassModelModel>
}

export type Schedule = Plain<ScheduleModel>

export const title: keyof Schedule = 'day'
