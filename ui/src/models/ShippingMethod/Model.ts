import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShipmentModel } from '@/models/Shipment/Model'

export interface ShippingMethodStorePayload {
	method_name: string
	description?: string
	cost: number
}

export interface ShippingMethodUpdatePayload {
	method_name?: string
	description?: string
	cost?: number
}

export interface ShippingMethodModel extends Model {
	id: Column<string | number>
	method_name: Column<string>
	description?: Column<string>
	cost: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	shipments?: Relation<ShipmentModel>
}

export type ShippingMethod = Plain<ShippingMethodModel>

export const title: keyof ShippingMethod = 'method_name'
