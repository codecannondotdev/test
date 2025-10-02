import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ShipmentModel } from '@/models/Shipment/Model'
import type { ProductModel } from '@/models/Product/Model'

export interface ShipmentItemStorePayload {
	quantity: number
	condition?: string
	product_id?: number
	shipment_id?: number
}

export interface ShipmentItemUpdatePayload {
	quantity?: number
	condition?: string
	product_id?: number
	shipment_id?: number
}

export interface ShipmentItemModel extends Model {
	id: Column<string | number>
	quantity: Column<number>
	condition?: Column<string>
	product_id?: Column<number>
	shipment_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	shipment?: Relation<ShipmentModel>
	product?: Relation<ProductModel>
}

export type ShipmentItem = Plain<ShipmentItemModel>

export const title: keyof ShipmentItem = 'condition'
