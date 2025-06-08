import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { MiningOperationModel } from '@/models/MiningOperation/Model'

export interface MineStorePayload {
	name: string
	location: string
	capacity: number
	status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'
}

export interface MineUpdatePayload {
	name?: string
	location?: string
	capacity?: number
	status?: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'
}

export interface MineModel extends Model {
	id: Column<string | number>
	name: Column<string>
	location: Column<string>
	capacity: Column<number>
	status: Column<'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'>
	created_at: Column<string>
	updated_at: Column<string>
	miningOperations?: Relation<MiningOperationModel>
}

export type Mine = Plain<MineModel>

export const title: keyof Mine = 'name'
