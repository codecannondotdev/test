import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { ReferralSourceModel } from '@/models/ReferralSource/Model'

export interface ReferralStorePayload {
	referral_source?: string
	reason?: string
	date?: string
	patient_id?: number
	referring_provider_id?: number
	receiving_provider_id?: number
	referral_source_id?: number
}

export interface ReferralUpdatePayload {
	referral_source?: string
	reason?: string
	date?: string
	patient_id?: number
	referring_provider_id?: number
	receiving_provider_id?: number
	referral_source_id?: number
}

export interface ReferralModel extends Model {
	id: Column<string | number>
	referral_source?: Column<string>
	reason?: Column<string>
	date?: Column<string>
	patient_id?: Column<number>
	referring_provider_id?: Column<number>
	receiving_provider_id?: Column<number>
	referral_source_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	referringProvider?: Relation<DoctorModel>
	receivingProvider?: Relation<DoctorModel>
	referralSource?: Relation<ReferralSourceModel>
}

export type Referral = Plain<ReferralModel>

export const title: keyof Referral = 'date'
