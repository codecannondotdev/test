import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AsdfasdfasdModel } from '@/models/Asdfasdfasd/Model'

export interface MembershipStorePayload {
	plan_name: string
	price: number
	duration_months?: number
	benefits?: string
	member_id?: number
}

export interface MembershipUpdatePayload {
	plan_name?: string
	price?: number
	duration_months?: number
	benefits?: string
	member_id?: number
}

export interface MembershipModel extends Model {
	id: Column<string | number>
	plan_name: Column<string>
	price: Column<number>
	duration_months?: Column<number>
	benefits?: Column<string>
	member_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	member?: Relation<AsdfasdfasdModel>
}

export type Membership = Plain<MembershipModel>

export const title: keyof Membership = 'plan_name'
