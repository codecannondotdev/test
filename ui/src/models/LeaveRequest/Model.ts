import type { Column, Plain, Model } from '@/helpers/models/Model'

export interface LeaveRequestStorePayload {
	start_date: string
	end_date: string
	type?: 'Annual' | 'Sick' | 'Unpaid'
	status?: 'Pending' | 'Approved' | 'Rejected'
}

export interface LeaveRequestUpdatePayload {
	start_date?: string
	end_date?: string
	type?: 'Annual' | 'Sick' | 'Unpaid'
	status?: 'Pending' | 'Approved' | 'Rejected'
}

export interface LeaveRequestModel extends Model {
	id: Column<string | number>
	start_date: Column<string>
	end_date: Column<string>
	type?: Column<'Annual' | 'Sick' | 'Unpaid'>
	status?: Column<'Pending' | 'Approved' | 'Rejected'>
	created_at: Column<string>
	updated_at: Column<string>
}

export type LeaveRequest = Plain<LeaveRequestModel>

export const title: keyof LeaveRequest = 'start_date'
