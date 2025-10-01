import type { Column, Plain, Model } from '@/helpers/models/Model'

export interface SettingsStorePayload {
	key: string
	value?: string
}

export interface SettingsUpdatePayload {
	key?: string
	value?: string
}

export interface SettingsModel extends Model {
	id: Column<string | number>
	key: Column<string>
	value?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
}

export type Settings = Plain<SettingsModel>

export const title: keyof Settings = 'key'
