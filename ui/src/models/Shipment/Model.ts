import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { OrderModel } from '@/models/Order/Model'
import type { WarehouseModel } from '@/models/Warehouse/Model'
import type { ShipmentItemModel } from '@/models/ShipmentItem/Model'
import type { ShippingMethodModel } from '@/models/ShippingMethod/Model'

export interface ShipmentStorePayload {
	shipment_date: string
	carrier: string
	tracking_number?: string
	order_id?: number
	warehouse_id?: number
	shipping_method_id?: number
}

export interface ShipmentUpdatePayload {
	shipment_date?: string
	carrier?: string
	tracking_number?: string
	order_id?: number
	warehouse_id?: number
	shipping_method_id?: number
}

export interface ShipmentModel extends Model {
	id: Column<string | number>
	shipment_date: Column<string>
	carrier: Column<string>
	tracking_number?: Column<string>
	order_id?: Column<number>
	warehouse_id?: Column<number>
	shipping_method_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	order?: Relation<OrderModel>
	warehouse?: Relation<WarehouseModel>
	shipmentItems?: Relation<ShipmentItemModel>
	shippingMethod?: Relation<ShippingMethodModel>
}

export type Shipment = Plain<ShipmentModel>

export const title: keyof Shipment = 'carrier'
