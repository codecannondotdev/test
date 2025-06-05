import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProductionBatchModel } from '@/models/ProductionBatch/Model'

export interface FactoryStorePayload {
	name: string
	location: string
	capacity: number
	status: 'OPERATIONAL' | 'SHUTDOWN' | 'MAINTENANCE'
}

export interface FactoryUpdatePayload {
	name?: string
	location?: string
	capacity?: number
	status?: 'OPERATIONAL' | 'SHUTDOWN' | 'MAINTENANCE'
}

export interface FactoryModel extends Model {
	id: Column<string | number>
	name: Column<string>
	location: Column<string>
	capacity: Column<number>
	status: Column<'OPERATIONAL' | 'SHUTDOWN' | 'MAINTENANCE'>
	created_at: Column<string>
	updated_at: Column<string>
	productionBatches?: Relation<ProductionBatchModel>
}

export type Factory = Plain<FactoryModel>

export const title: keyof Factory = 'name'
