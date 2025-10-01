import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PermissionModel } from '@/models/Permission/Model'

export interface RoleStorePayload {
	name: string
	description?: string
}

export interface RoleUpdatePayload {
	name?: string
	description?: string
}

export interface RoleModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	permissions?: Relation<PermissionModel>
}

export type Role = Plain<RoleModel>

export const title: keyof Role = 'name'
