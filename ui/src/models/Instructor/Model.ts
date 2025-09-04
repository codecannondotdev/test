import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ClassModelModel } from '@/models/ClassModel/Model'
import type { ProgramModel } from '@/models/Program/Model'

export interface InstructorStorePayload {
	first_name: string
	last_name: string
	bio?: string
	email: string
}

export interface InstructorUpdatePayload {
	first_name?: string
	last_name?: string
	bio?: string
	email?: string
}

export interface InstructorModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	bio?: Column<string>
	email: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	classes?: Relation<ClassModelModel>
	programs?: Relation<ProgramModel>
}

export type Instructor = Plain<InstructorModel>

export const title: keyof Instructor = 'first_name'
