import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { RoleModel } from '@/models/Role/Model'

export interface PermissionStorePayload {
	name: string
	description?: string
}

export interface PermissionUpdatePayload {
	name?: string
	description?: string
}

export interface PermissionModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	roles?: Relation<RoleModel>
}

export type Permission = Plain<PermissionModel>

export const title: keyof Permission = 'name'
