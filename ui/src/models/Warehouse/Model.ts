import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { InventoryModel } from '@/models/Inventory/Model'
import type { ShipmentModel } from '@/models/Shipment/Model'
import type { LocationModel } from '@/models/Location/Model'

export interface WarehouseStorePayload {
	name: string
	location_description: string
}

export interface WarehouseUpdatePayload {
	name?: string
	location_description?: string
}

export interface WarehouseModel extends Model {
	id: Column<string | number>
	name: Column<string>
	location_description: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	inventories?: Relation<InventoryModel>
	shipments?: Relation<ShipmentModel>
	locations?: Relation<LocationModel>
}

export type Warehouse = Plain<WarehouseModel>

export const title: keyof Warehouse = 'name'
