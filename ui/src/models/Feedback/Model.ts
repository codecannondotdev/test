import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MemberModel } from '@/models/Member/Model'
import type { ClassModelModel } from '@/models/ClassModel/Model'

export interface FeedbackStorePayload {
	rating: number
	comment?: string
	feedback_date: string
	member_id?: number
	class_id?: number
}

export interface FeedbackUpdatePayload {
	rating?: number
	comment?: string
	feedback_date?: string
	member_id?: number
	class_id?: number
}

export interface FeedbackModel extends Model {
	id: Column<string | number>
	rating: Column<number>
	comment?: Column<string>
	feedback_date: Column<string>
	member_id?: Column<number>
	class_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<MemberModel>
	class?: Relation<ClassModelModel>
}

export type Feedback = Plain<FeedbackModel>

export const title: keyof Feedback = 'comment'
