import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MaterialModel } from '@/models/Material/Model'
import type { MineModel } from '@/models/Mine/Model'

export interface MiningOperationStorePayload {
	extraction_date: string
	quantity_extracted: number
	notes?: string
	material_id?: number
	mine_id?: number
}

export interface MiningOperationUpdatePayload {
	extraction_date?: string
	quantity_extracted?: number
	notes?: string
	material_id?: number
	mine_id?: number
}

export interface MiningOperationModel extends Model {
	id: Column<string | number>
	extraction_date: Column<string>
	quantity_extracted: Column<number>
	notes?: Column<string>
	material_id?: Column<number>
	mine_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	material?: Relation<MaterialModel>
	mine?: Relation<MineModel>
}

export type MiningOperation = Plain<MiningOperationModel>

export const title: keyof MiningOperation = 'extraction_date'
