import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PrescriptionModel } from '@/models/Prescription/Model'
import type { MedicationModel } from '@/models/Medication/Model'

export interface PharmacyOrderStorePayload {
	order_date: string
	status?: 'PENDING' | 'FULFILLED' | 'CANCELLED'
	pickup_location?: string
	prescription_id?: number
}

export interface PharmacyOrderUpdatePayload {
	order_date?: string
	status?: 'PENDING' | 'FULFILLED' | 'CANCELLED'
	pickup_location?: string
	prescription_id?: number
}

export interface PharmacyOrderModel extends Model {
	id: Column<string | number>
	order_date: Column<string>
	status?: Column<'PENDING' | 'FULFILLED' | 'CANCELLED'>
	pickup_location?: Column<string>
	prescription_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	prescription?: Relation<PrescriptionModel>
	medications?: Relation<MedicationModel>
}

export type PharmacyOrder = Plain<PharmacyOrderModel>

export const title: keyof PharmacyOrder = 'order_date'
