import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { MedicationModel } from '@/models/Medication/Model'
import type { PharmacyOrderModel } from '@/models/PharmacyOrder/Model'

export interface PrescriptionStorePayload {
	dose: string
	frequency?: string
	duration?: string
	instructions?: string
	patient_id?: number
	prescriber_id?: number
	medication_id?: number
}

export interface PrescriptionUpdatePayload {
	dose?: string
	frequency?: string
	duration?: string
	instructions?: string
	patient_id?: number
	prescriber_id?: number
	medication_id?: number
}

export interface PrescriptionModel extends Model {
	id: Column<string | number>
	dose: Column<string>
	frequency?: Column<string>
	duration?: Column<string>
	instructions?: Column<string>
	patient_id?: Column<number>
	prescriber_id?: Column<number>
	medication_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	prescriber?: Relation<DoctorModel>
	medication?: Relation<MedicationModel>
	pharmacyOrder?: Relation<PharmacyOrderModel>
}

export type Prescription = Plain<PrescriptionModel>

export const title: keyof Prescription = 'dose'
