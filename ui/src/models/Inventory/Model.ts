import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MaterialModel } from '@/models/Material/Model'
import type { CarModelModel } from '@/models/CarModel/Model'

export interface InventoryStorePayload {
	inventory_type: 'RAW MATERIAL' | 'FINISHED PRODUCT'
	item_name: string
	quantity_on_hand: number
	location: string
	last_updated: string
	material_id?: number
	car_model_id?: number
}

export interface InventoryUpdatePayload {
	inventory_type?: 'RAW MATERIAL' | 'FINISHED PRODUCT'
	item_name?: string
	quantity_on_hand?: number
	location?: string
	last_updated?: string
	material_id?: number
	car_model_id?: number
}

export interface InventoryModel extends Model {
	id: Column<string | number>
	inventory_type: Column<'RAW MATERIAL' | 'FINISHED PRODUCT'>
	item_name: Column<string>
	quantity_on_hand: Column<number>
	location: Column<string>
	last_updated: Column<string>
	material_id?: Column<number>
	car_model_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	material?: Relation<MaterialModel>
	carModel?: Relation<CarModelModel>
}

export type Inventory = Plain<InventoryModel>

export const title: keyof Inventory = 'item_name'
