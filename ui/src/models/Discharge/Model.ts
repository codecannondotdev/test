import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AdmissionModel } from '@/models/Admission/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { DischargeSummaryModel } from '@/models/DischargeSummary/Model'

export interface DischargeStorePayload {
	discharge_date: string
	condition_at_discharge?: string
	instructions?: string
	admission_id?: number
}

export interface DischargeUpdatePayload {
	discharge_date?: string
	condition_at_discharge?: string
	instructions?: string
	admission_id?: number
}

export interface DischargeModel extends Model {
	id: Column<string | number>
	discharge_date: Column<string>
	condition_at_discharge?: Column<string>
	instructions?: Column<string>
	admission_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	admission?: Relation<AdmissionModel>
	followUpAppointments?: Relation<AppointmentModel>
	dischargeSummary?: Relation<DischargeSummaryModel>
}

export type Discharge = Plain<DischargeModel>

export const title: keyof Discharge = 'discharge_date'
