import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { TrainerModel } from '@/models/Trainer/Model'
import type { SessionModel } from '@/models/Session/Model'

export interface ClassModelStorePayload {
	name: string
	description: string
	difficulty_level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
	duration: string
	trainer_id?: number
}

export interface ClassModelUpdatePayload {
	name?: string
	description?: string
	difficulty_level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
	duration?: string
	trainer_id?: number
}

export interface ClassModelModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description: Column<string>
	difficulty_level?: Column<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>
	duration: Column<string>
	trainer_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	trainer?: Relation<TrainerModel>
	sessions?: Relation<SessionModel>
}

export type ClassModel = Plain<ClassModelModel>

export const title: keyof ClassModel = 'name'
