import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { IntegrationModel } from '@/models/Integration/Model'

export interface APIKeyStorePayload {
	name: string
	expires_at?: string
}

export interface APIKeyUpdatePayload {
	name?: string
	expires_at?: string
}

export interface APIKeyModel extends Model {
	id: Column<string | number>
	name: Column<string>
	expires_at?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	integrations?: Relation<IntegrationModel>
}

export type APIKey = Plain<APIKeyModel>

export const title: keyof APIKey = 'name'
