import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { CustomerModel } from '@/models/Customer/Model'
import type { CarModelModel } from '@/models/CarModel/Model'
import type { ShipmentModel } from '@/models/Shipment/Model'

export interface SalesOrderStorePayload {
	order_number: string
	order_date: string
	quantity: number
	unit_price: number
	total_amount: number
	car_model_id?: number
	customer_id?: number
	status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'
}

export interface SalesOrderUpdatePayload {
	order_number?: string
	order_date?: string
	quantity?: number
	unit_price?: number
	total_amount?: number
	car_model_id?: number
	customer_id?: number
	status?: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'
}

export interface SalesOrderModel extends Model {
	id: Column<string | number>
	order_number: Column<string>
	order_date: Column<string>
	quantity: Column<number>
	unit_price: Column<number>
	total_amount: Column<number>
	car_model_id?: Column<number>
	customer_id?: Column<number>
	status: Column<'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'>
	created_at: Column<string>
	updated_at: Column<string>
	customer?: Relation<CustomerModel>
	carModel?: Relation<CarModelModel>
	shipments?: Relation<ShipmentModel>
}

export type SalesOrder = Plain<SalesOrderModel>

export const title: keyof SalesOrder = 'order_number'
