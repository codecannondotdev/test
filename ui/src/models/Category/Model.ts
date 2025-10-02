import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { ProductModel } from '@/models/Product/Model'

export interface CategoryStorePayload {
	name: string
	description?: string
}

export interface CategoryUpdatePayload {
	name?: string
	description?: string
}

export interface CategoryModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	products?: Relation<ProductModel>
}

export type Category = Plain<CategoryModel>

export const title: keyof Category = 'name'
