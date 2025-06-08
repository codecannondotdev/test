import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProductionBatchModel } from '@/models/ProductionBatch/Model'
import type { SalesOrderModel } from '@/models/SalesOrder/Model'
import type { InventoryModel } from '@/models/Inventory/Model'

export interface CarModelStorePayload {
	model_name: string
	engine_type: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'
	features?: string
	base_price: number
}

export interface CarModelUpdatePayload {
	model_name?: string
	engine_type?: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'
	features?: string
	base_price?: number
}

export interface CarModelModel extends Model {
	id: Column<string | number>
	model_name: Column<string>
	engine_type: Column<'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'>
	features?: Column<string>
	base_price: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	productionBatches?: Relation<ProductionBatchModel>
	salesOrders?: Relation<SalesOrderModel>
	inventoryItems?: Relation<InventoryModel>
}

export type CarModel = Plain<CarModelModel>

export const title: keyof CarModel = 'model_name'
