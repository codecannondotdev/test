import type { MedicalDeviceMaintenanceModel } from '@/models/MedicalDeviceMaintenance/Model'
import MedicalDeviceMaintenancesApi from '@/models/MedicalDeviceMaintenance/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MedicalDeviceMaintenanceDetailsState extends DetailsState<
	MedicalDeviceMaintenancesApi,
	MedicalDeviceMaintenanceModel
> {
	api = new MedicalDeviceMaintenancesApi()
}

export function useMedicalDeviceMaintenanceDetailsState() {
	return new MedicalDeviceMaintenanceDetailsState()
}

export class MedicalDeviceMaintenanceListState extends ListState<
	MedicalDeviceMaintenancesApi,
	MedicalDeviceMaintenanceModel,
	LaravelPaginationResponse<MedicalDeviceMaintenanceModel>
> {
	api = new MedicalDeviceMaintenancesApi()
}

export function useMedicalDeviceMaintenanceListState() {
	return new MedicalDeviceMaintenanceListState()
}
