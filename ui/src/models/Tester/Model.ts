import type { Column, Plain, Model } from '@/helpers/models/Model'

export interface TesterStorePayload {
	asdfasdfasd?: string
	asdffasdfasdfasdf: 'aaaaaaaaaaaaaaaa' | 'sssssssssssssss' | 'ddddddddddddddd'
	nice_names: 'aaaaaaaaaaaaaaaaaa' | 'ssssssssssssssssss' | 'dddddddddddddd'
}

export interface TesterUpdatePayload {
	asdfasdfasd?: string
	asdffasdfasdfasdf?: 'aaaaaaaaaaaaaaaa' | 'sssssssssssssss' | 'ddddddddddddddd'
	nice_names?: 'aaaaaaaaaaaaaaaaaa' | 'ssssssssssssssssss' | 'dddddddddddddd'
}

export interface TesterModel extends Model {
	id: Column<string | number>
	asdfasdfasd?: Column<string>
	asdffasdfasdfasdf: Column<'aaaaaaaaaaaaaaaa' | 'sssssssssssssss' | 'ddddddddddddddd'>
	nice_names: Column<'aaaaaaaaaaaaaaaaaa' | 'ssssssssssssssssss' | 'dddddddddddddd'>
	created_at: Column<string>
	updated_at: Column<string>
}

export type Tester = Plain<TesterModel>

export const title: keyof Tester = 'asdfasdfasdasasdf'
