import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SessionModel } from '@/models/Session/Model'
import type { ClassModelModel } from '@/models/ClassModel/Model'

export interface TrainerStorePayload {
	first_name: string
	last_name: string
	specialty?: string
	email: string
	bio?: string
}

export interface TrainerUpdatePayload {
	first_name?: string
	last_name?: string
	specialty?: string
	email?: string
	bio?: string
}

export interface TrainerModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	specialty?: Column<string>
	email: Column<string>
	bio?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	sessions?: Relation<SessionModel>
	classes?: Relation<ClassModelModel>
}

export type Trainer = Plain<TrainerModel>

export const title: keyof Trainer = 'first_name'
