import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { PrescriptionModel } from '@/models/Prescription/Model'
import type { DepartmentModel } from '@/models/Department/Model'
import type { LabTestModel } from '@/models/LabTest/Model'
import type { SurgeryModel } from '@/models/Surgery/Model'
import type { AnesthesiaModel } from '@/models/Anesthesia/Model'
import type { ReferralModel } from '@/models/Referral/Model'
import type { SpecialtyModel } from '@/models/Specialty/Model'
import type { LabOrderModel } from '@/models/LabOrder/Model'

export interface DoctorStorePayload {
	first_name: string
	last_name: string
	specialty: string
	phone?: string
	email?: string
	license_number: string
	consulation_fee?: number
}

export interface DoctorUpdatePayload {
	first_name?: string
	last_name?: string
	specialty?: string
	phone?: string
	email?: string
	license_number?: string
	consulation_fee?: number
}

export interface DoctorModel extends Model {
	id: Column<string | number>
	first_name: Column<string>
	last_name: Column<string>
	specialty: Column<string>
	phone?: Column<string>
	email?: Column<string>
	license_number: Column<string>
	consulation_fee?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	appointments?: Relation<AppointmentModel>
	treatments?: Relation<TreatmentModel>
	prescriptions?: Relation<PrescriptionModel>
	departments?: Relation<DepartmentModel>
	labTests?: Relation<LabTestModel>
	surgeries?: Relation<SurgeryModel>
	anesthesia?: Relation<AnesthesiaModel>
	referralsMade?: Relation<ReferralModel>
	referralsReceived?: Relation<ReferralModel>
	specialties?: Relation<SpecialtyModel>
	labOrders?: Relation<LabOrderModel>
}

export type Doctor = Plain<DoctorModel>

export const title: keyof Doctor = 'first_name'
