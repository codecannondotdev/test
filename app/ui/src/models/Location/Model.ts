import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { WarehouseModel } from '@/models/Warehouse/Model'

export interface LocationStorePayload {
	aisle: string
	section: string
	shelf: string
	warehouse_id?: number
}

export interface LocationUpdatePayload {
	aisle?: string
	section?: string
	shelf?: string
	warehouse_id?: number
}

export interface LocationModel extends Model {
	id: Column<string | number>
	aisle: Column<string>
	section: Column<string>
	shelf: Column<string>
	warehouse_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	warehouse?: Relation<WarehouseModel>
}

export type Location = Plain<LocationModel>

export const title: keyof Location = 'aisle'
