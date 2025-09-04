import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { StudioModel } from '@/models/Studio/Model'

export interface EquipmentStorePayload {
	name: string
	description?: string
	purchase_date?: string
	studio_id?: number
}

export interface EquipmentUpdatePayload {
	name?: string
	description?: string
	purchase_date?: string
	studio_id?: number
}

export interface EquipmentModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	purchase_date?: Column<string>
	studio_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	studio?: Relation<StudioModel>
}

export type Equipment = Plain<EquipmentModel>

export const title: keyof Equipment = 'name'
