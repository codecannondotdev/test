import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { SalesOrderModel } from '@/models/SalesOrder/Model'

export interface ShipmentStorePayload {
	shipment_number: string
	shipment_date: string
	quantity_shipped: number
	destination: string
	status: 'PENDING' | 'IN TRANSIT' | 'DELIVERED'
	carrier?: string
	sales_order_id?: number
}

export interface ShipmentUpdatePayload {
	shipment_number?: string
	shipment_date?: string
	quantity_shipped?: number
	destination?: string
	status?: 'PENDING' | 'IN TRANSIT' | 'DELIVERED'
	carrier?: string
	sales_order_id?: number
}

export interface ShipmentModel extends Model {
	id: Column<string | number>
	shipment_number: Column<string>
	shipment_date: Column<string>
	quantity_shipped: Column<number>
	destination: Column<string>
	status: Column<'PENDING' | 'IN TRANSIT' | 'DELIVERED'>
	carrier?: Column<string>
	sales_order_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	salesOrder?: Relation<SalesOrderModel>
}

export type Shipment = Plain<ShipmentModel>

export const title: keyof Shipment = 'shipment_number'
