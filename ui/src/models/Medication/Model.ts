import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { PrescriptionModel } from '@/models/Prescription/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { InventoryItemModel } from '@/models/InventoryItem/Model'
import type { PharmacyOrderModel } from '@/models/PharmacyOrder/Model'
import type { BarcodeLabelModel } from '@/models/BarcodeLabel/Model'

export interface MedicationStorePayload {
	name: string
	formulation?: string
	strength?: string
	route?: 'ORAL' | 'IV' | 'IM' | 'SUBCUTANEOUS'
	indications?: string
}

export interface MedicationUpdatePayload {
	name?: string
	formulation?: string
	strength?: string
	route?: 'ORAL' | 'IV' | 'IM' | 'SUBCUTANEOUS'
	indications?: string
}

export interface MedicationModel extends Model {
	id: Column<string | number>
	name: Column<string>
	formulation?: Column<string>
	strength?: Column<string>
	route?: Column<'ORAL' | 'IV' | 'IM' | 'SUBCUTANEOUS'>
	indications?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	prescriptions?: Relation<PrescriptionModel>
	treatments?: Relation<TreatmentModel>
	inventoryItems?: Relation<InventoryItemModel>
	pharmacyOrders?: Relation<PharmacyOrderModel>
	barcodeLabels?: Relation<BarcodeLabelModel>
}

export type Medication = Plain<MedicationModel>

export const title: keyof Medication = 'name'
