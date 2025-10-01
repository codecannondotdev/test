import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { TransfusionModel } from '@/models/Transfusion/Model'

export interface BloodProductStorePayload {
	product_type: 'Whole Blood' | 'PRBC' | 'Platelets' | 'Plasma'
	storage_temperature?: string
	shelf_life_days?: number
}

export interface BloodProductUpdatePayload {
	product_type?: 'Whole Blood' | 'PRBC' | 'Platelets' | 'Plasma'
	storage_temperature?: string
	shelf_life_days?: number
}

export interface BloodProductModel extends Model {
	id: Column<string | number>
	product_type: Column<'Whole Blood' | 'PRBC' | 'Platelets' | 'Plasma'>
	storage_temperature?: Column<string>
	shelf_life_days?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	transfusions?: Relation<TransfusionModel>
}

export type BloodProduct = Plain<BloodProductModel>

export const title: keyof BloodProduct = 'product_type'
