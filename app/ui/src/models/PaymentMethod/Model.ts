import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PaymentModel } from '@/models/Payment/Model'

export interface PaymentMethodStorePayload {
	name: string
	provider_details?: string
}

export interface PaymentMethodUpdatePayload {
	name?: string
	provider_details?: string
}

export interface PaymentMethodModel extends Model {
	id: Column<string | number>
	name: Column<string>
	provider_details?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	payments?: Relation<PaymentModel>
}

export type PaymentMethod = Plain<PaymentMethodModel>

export const title: keyof PaymentMethod = 'name'
