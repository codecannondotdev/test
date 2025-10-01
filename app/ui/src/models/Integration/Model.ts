import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { APIKeyModel } from '@/models/APIKey/Model'
import type { HL7MessageModel } from '@/models/HL7Message/Model'
import type { DICOMInstanceModel } from '@/models/DICOMInstance/Model'

export interface IntegrationStorePayload {
	name: string
	type?: 'HL7' | 'DICOM' | 'REST' | 'SOAP'
	endpoint?: string
	api_key_id?: number
}

export interface IntegrationUpdatePayload {
	name?: string
	type?: 'HL7' | 'DICOM' | 'REST' | 'SOAP'
	endpoint?: string
	api_key_id?: number
}

export interface IntegrationModel extends Model {
	id: Column<string | number>
	name: Column<string>
	type?: Column<'HL7' | 'DICOM' | 'REST' | 'SOAP'>
	endpoint?: Column<string>
	api_key_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	apiKey?: Relation<APIKeyModel>
	hl7Messages?: Relation<HL7MessageModel>
	dicomInstances?: Relation<DICOMInstanceModel>
}

export type Integration = Plain<IntegrationModel>

export const title: keyof Integration = 'name'
