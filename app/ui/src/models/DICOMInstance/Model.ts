import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ImagingStudyModel } from '@/models/ImagingStudy/Model'
import type { IntegrationModel } from '@/models/Integration/Model'

export interface DICOMInstanceStorePayload {
	uid: string
	sop_class?: string
	stored_at?: string
	imaging_study_id?: number
	integration_id?: number
}

export interface DICOMInstanceUpdatePayload {
	uid?: string
	sop_class?: string
	stored_at?: string
	imaging_study_id?: number
	integration_id?: number
}

export interface DICOMInstanceModel extends Model {
	id: Column<string | number>
	uid: Column<string>
	sop_class?: Column<string>
	stored_at?: Column<string>
	imaging_study_id?: Column<number>
	integration_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	imagingStudy?: Relation<ImagingStudyModel>
	integration?: Relation<IntegrationModel>
}

export type DICOMInstance = Plain<DICOMInstanceModel>

export const title: keyof DICOMInstance = 'uid'
