import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PredalModel } from '@/models/Predal/Model'

export interface KartaStorePayload {
	ime?: string
	oceno?: string
	edition?: string
	card_number?: string
	condition?: string
	predal_id?: number
}

export interface KartaUpdatePayload {
	ime?: string
	oceno?: string
	edition?: string
	card_number?: string
	condition?: string
	predal_id?: number
}

export interface KartaModel extends Model {
	id: Column<string | number>
	ime?: Column<string>
	oceno?: Column<string>
	edition?: Column<string>
	card_number?: Column<string>
	condition?: Column<string>
	predal_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	predal?: Relation<PredalModel>
}

export type Karta = Plain<KartaModel>

export const title: keyof Karta = 'ime'
