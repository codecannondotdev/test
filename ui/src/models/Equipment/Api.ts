import type {
	EquipmentModel,
	EquipmentStorePayload,
	EquipmentUpdatePayload,
} from '@/models/Equipment/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class EquipmentsApi extends Api<
	EquipmentModel,
	LaravelPaginationResponse<EquipmentModel>,
	EquipmentStorePayload,
	EquipmentUpdatePayload
> {
	route = 'equipments'
}
