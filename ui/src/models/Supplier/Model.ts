import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PurchaseOrderModel } from '@/models/PurchaseOrder/Model'
import type { MaterialModel } from '@/models/Material/Model'

export interface SupplierStorePayload {
	company_name: string
	contact_person: string
	contact_email: string
	rating?: 'A' | 'B' | 'C' | 'D'
}

export interface SupplierUpdatePayload {
	company_name?: string
	contact_person?: string
	contact_email?: string
	rating?: 'A' | 'B' | 'C' | 'D'
}

export interface SupplierModel extends Model {
	id: Column<string | number>
	company_name: Column<string>
	contact_person: Column<string>
	contact_email: Column<string>
	rating?: Column<'A' | 'B' | 'C' | 'D'>
	created_at: Column<string>
	updated_at: Column<string>
	purchaseOrders?: Relation<PurchaseOrderModel>
	materials?: Relation<MaterialModel>
}

export type Supplier = Plain<SupplierModel>

export const title: keyof Supplier = 'company_name'
