import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PatientModel } from '@/models/Patient/Model'
import type { DoctorModel } from '@/models/Doctor/Model'
import type { NurseModel } from '@/models/Nurse/Model'
import type { DepartmentModel } from '@/models/Department/Model'
import type { NoteModel } from '@/models/Note/Model'
import type { DischargeModel } from '@/models/Discharge/Model'
import type { RoomModel } from '@/models/Room/Model'
import type { QueueModel } from '@/models/Queue/Model'
import type { WaitingListModel } from '@/models/WaitingList/Model'
import type { TelemedicineSessionModel } from '@/models/TelemedicineSession/Model'
import type { AppointmentTypeModel } from '@/models/AppointmentType/Model'
import type { FollowUpModel } from '@/models/FollowUp/Model'
import type { ReferralSourceModel } from '@/models/ReferralSource/Model'

export interface AppointmentStorePayload {
	type?: 'Consultation' | 'Follow-up' | 'Procedure' | 'Telemedicine'
	start_time: string
	end_time: string
	status?: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show'
	reason?: string
	location?: string
	patient_id?: number
	doctor_id?: number
	nurse_id?: number
	department_id?: number
	discharge_id?: number
	location_id?: number
	queue_id?: number
	type_id?: number
	referral_source_id?: number
}

export interface AppointmentUpdatePayload {
	type?: 'Consultation' | 'Follow-up' | 'Procedure' | 'Telemedicine'
	start_time?: string
	end_time?: string
	status?: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show'
	reason?: string
	location?: string
	patient_id?: number
	doctor_id?: number
	nurse_id?: number
	department_id?: number
	discharge_id?: number
	location_id?: number
	queue_id?: number
	type_id?: number
	referral_source_id?: number
}

export interface AppointmentModel extends Model {
	id: Column<string | number>
	type?: Column<'Consultation' | 'Follow-up' | 'Procedure' | 'Telemedicine'>
	start_time: Column<string>
	end_time: Column<string>
	status?: Column<'Scheduled' | 'Completed' | 'Cancelled' | 'No-show'>
	reason?: Column<string>
	location?: Column<string>
	patient_id?: Column<number>
	doctor_id?: Column<number>
	nurse_id?: Column<number>
	department_id?: Column<number>
	discharge_id?: Column<number>
	location_id?: Column<number>
	queue_id?: Column<number>
	type_id?: Column<number>
	referral_source_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	patient?: Relation<PatientModel>
	doctor?: Relation<DoctorModel>
	nurse?: Relation<NurseModel>
	department?: Relation<DepartmentModel>
	visitNotes?: Relation<NoteModel>
	discharge?: Relation<DischargeModel>
	location?: Relation<RoomModel>
	queue?: Relation<QueueModel>
	waitingList?: Relation<WaitingListModel>
	telemedicineSession?: Relation<TelemedicineSessionModel>
	type?: Relation<AppointmentTypeModel>
	followUp?: Relation<FollowUpModel>
	referralSource?: Relation<ReferralSourceModel>
}

export type Appointment = Plain<AppointmentModel>

export const title: keyof Appointment = 'start_time'
