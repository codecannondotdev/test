import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { SurgeryModel } from '@/models/Surgery/Model'
import type { ConsentFormModel } from '@/models/ConsentForm/Model'

export interface ProcedureStorePayload {
	name: string
	description?: string
	duration?: string
	treatment_id?: number
}

export interface ProcedureUpdatePayload {
	name?: string
	description?: string
	duration?: string
	treatment_id?: number
}

export interface ProcedureModel extends Model {
	id: Column<string | number>
	name: Column<string>
	description?: Column<string>
	duration?: Column<string>
	treatment_id?: Column<number>
	created_at: Column<string>
	updated_at: Column<string>
	treatment?: Relation<TreatmentModel>
	surgeries?: Relation<SurgeryModel>
	consentForms?: Relation<ConsentFormModel>
}

export type Procedure = Plain<ProcedureModel>

export const title: keyof Procedure = 'name'
