import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ClassModelModel } from '@/models/ClassModel/Model'
import type { InstructorModel } from '@/models/Instructor/Model'

export interface ProgramStorePayload {
	name: string
	description: string
	duration_weeks: number
	instructor_id?: number
}

export interface ProgramUpdatePayload {
	name?: string
	description?: string
	duration_weeks?: number
	instructor_id?: number
}

export interface ProgramModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description: Column<string>
	duration_weeks: Column<number>
	instructor_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	classes?: Relation<ClassModelModel>
	instructor?: Relation<InstructorModel>
}

export type Program = Plain<ProgramModel>

export const title: keyof Program = 'name'
