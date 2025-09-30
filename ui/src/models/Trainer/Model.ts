import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { FitnessClassModel } from '@/models/FitnessClass/Model'

export interface TrainerStorePayload {
	first_name: string
	last_name: string
	email: string
	specialty?: string
	bio?: string
}

export interface TrainerUpdatePayload {
	first_name?: string
	last_name?: string
	email?: string
	specialty?: string
	bio?: string
}

export interface TrainerModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	email: Column<string>
	specialty?: Column<string>
	bio?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	classes?: Relation<FitnessClassModel>
}

export type Trainer = Plain<TrainerModel>

export const title: keyof Trainer = 'first_name'
