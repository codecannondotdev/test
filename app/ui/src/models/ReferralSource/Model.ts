import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ReferralModel } from '@/models/Referral/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'

export interface ReferralSourceStorePayload {
	name: string
	type?: string
}

export interface ReferralSourceUpdatePayload {
	name?: string
	type?: string
}

export interface ReferralSourceModel extends Model {
	id: Column<string | number>
	name: Column<string>
	type?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	referrals?: Relation<ReferralModel>
	appointments?: Relation<AppointmentModel>
}

export type ReferralSource = Plain<ReferralSourceModel>

export const title: keyof ReferralSource = 'name'
