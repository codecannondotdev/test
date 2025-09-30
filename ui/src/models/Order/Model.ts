import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { CustomerModel } from '@/models/Customer/Model'
import type { OrderItemModel } from '@/models/OrderItem/Model'
import type { TransactionModel } from '@/models/Transaction/Model'
import type { ShipmentModel } from '@/models/Shipment/Model'
import type { PaymentModel } from '@/models/Payment/Model'
import type { ReturnModelModel } from '@/models/ReturnModel/Model'

export interface OrderStorePayload {
	order_date: string
	status: string
	total_amount: number
	customer_id?: number
}

export interface OrderUpdatePayload {
	order_date?: string
	status?: string
	total_amount?: number
	customer_id?: number
}

export interface OrderModel extends Model {
	id: Column<string | number>
	order_date: Column<string>
	status: Column<string>
	total_amount: Column<number>
	customer_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	customer?: Relation<CustomerModel>
	orderItems?: Relation<OrderItemModel>
	transactions?: Relation<TransactionModel>
	shipment?: Relation<ShipmentModel>
	payments?: Relation<PaymentModel>
	returns?: Relation<ReturnModelModel>
}

export type Order = Plain<OrderModel>

export const title: keyof Order = 'status'
