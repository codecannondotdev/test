import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { IntegrationModel } from '@/models/Integration/Model'

export interface HL7MessageStorePayload {
	message_type: string
	received_at: string
	payload?: string
	integration_id?: number
}

export interface HL7MessageUpdatePayload {
	message_type?: string
	received_at?: string
	payload?: string
	integration_id?: number
}

export interface HL7MessageModel extends Model {
	id: Column<string | number>
	message_type: Column<string>
	received_at: Column<string>
	payload?: Column<string>
	integration_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	integration?: Relation<IntegrationModel>
}

export type HL7Message = Plain<HL7MessageModel>

export const title: keyof HL7Message = 'message_type'
