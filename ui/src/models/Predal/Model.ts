import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { KartaModel } from '@/models/Karta/Model'

export interface PredalStorePayload {
	stevilka_predala?: string
}

export interface PredalUpdatePayload {
	stevilka_predala?: string
}

export interface PredalModel extends Model {
	id: Column<string | number>
	stevilka_predala?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	kartas?: Relation<KartaModel>
}

export type Predal = Plain<PredalModel>

export const title: keyof Predal = 'stevilka_predala'
