import type { EquipmentModel } from '@/models/Equipment/Model'
import EquipmentsApi from '@/models/Equipment/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class EquipmentDetailsState extends DetailsState<EquipmentsApi, EquipmentModel> {
	api = new EquipmentsApi()
}

export function useEquipmentDetailsState() {
	return new EquipmentDetailsState()
}

export class EquipmentListState extends ListState<
	EquipmentsApi,
	EquipmentModel,
	LaravelPaginationResponse<EquipmentModel>
> {
	api = new EquipmentsApi()
}

export function useEquipmentListState() {
	return new EquipmentListState()
}
