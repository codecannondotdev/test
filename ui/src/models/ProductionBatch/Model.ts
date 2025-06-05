import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { FactoryModel } from '@/models/Factory/Model'
import type { CarModelModel } from '@/models/CarModel/Model'

export interface ProductionBatchStorePayload {
	batch_identifier: string
	start_date: string
	end_date?: string
	quantity_produced: number
	notes?: string
	factory_id?: number
	car_model_id?: number
}

export interface ProductionBatchUpdatePayload {
	batch_identifier?: string
	start_date?: string
	end_date?: string
	quantity_produced?: number
	notes?: string
	factory_id?: number
	car_model_id?: number
}

export interface ProductionBatchModel extends Model {
	id: Column<string | number>
	batch_identifier: Column<string>
	start_date: Column<string>
	end_date?: Column<string>
	quantity_produced: Column<number>
	notes?: Column<string>
	factory_id?: Column<number>
	car_model_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	factory?: Relation<FactoryModel>
	carModel?: Relation<CarModelModel>
}

export type ProductionBatch = Plain<ProductionBatchModel>

export const title: keyof ProductionBatch = 'batch_identifier'
