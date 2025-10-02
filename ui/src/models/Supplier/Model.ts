import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProductModel } from '@/models/Product/Model'
import type { PurchaseOrderModel } from '@/models/PurchaseOrder/Model'

export interface SupplierStorePayload {
	name: string
	contact_email: string
	phone_number?: string
}

export interface SupplierUpdatePayload {
	name?: string
	contact_email?: string
	phone_number?: string
}

export interface SupplierModel extends Model {
	id: Column<string | number>
	name: Column<string>
	contact_email: Column<string>
	phone_number?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	products?: Relation<ProductModel>
	purchaseOrders?: Relation<PurchaseOrderModel>
}

export type Supplier = Plain<SupplierModel>

export const title: keyof Supplier = 'name'
