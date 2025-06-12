import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SessionModel } from '@/models/Session/Model'

export interface ScheduleStorePayload {
	title: string
	description?: string
	start_date: string
	end_date: string
}

export interface ScheduleUpdatePayload {
	title?: string
	description?: string
	start_date?: string
	end_date?: string
}

export interface ScheduleModel extends Model {
	id: Column<string | number>
	title: Column<string>
	description?: Column<string>
	start_date: Column<string>
	end_date: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	sessions?: Relation<SessionModel>
}

export type Schedule = Plain<ScheduleModel>

export const title: keyof Schedule = 'title'
