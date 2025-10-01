import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { DepartmentModel } from '@/models/Department/Model'
import type { BedModel } from '@/models/Bed/Model'
import type { NurseModel } from '@/models/Nurse/Model'
import type { AdmissionModel } from '@/models/Admission/Model'
import type { RoomModel } from '@/models/Room/Model'
import type { DeviceModel } from '@/models/Device/Model'

export interface WardStorePayload {
	name: string
	floor?: string
	capacity?: number
	department_id?: number
}

export interface WardUpdatePayload {
	name?: string
	floor?: string
	capacity?: number
	department_id?: number
}

export interface WardModel extends Model {
	id: Column<string | number>
	name: Column<string>
	floor?: Column<string>
	capacity?: Column<number>
	department_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	department?: Relation<DepartmentModel>
	beds?: Relation<BedModel>
	nurses?: Relation<NurseModel>
	admissions?: Relation<AdmissionModel>
	rooms?: Relation<RoomModel>
	devices?: Relation<DeviceModel>
}

export type Ward = Plain<WardModel>

export const title: keyof Ward = 'name'
