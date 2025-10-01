import type {
	MedicalDeviceMaintenanceModel,
	MedicalDeviceMaintenanceStorePayload,
	MedicalDeviceMaintenanceUpdatePayload,
} from '@/models/MedicalDeviceMaintenance/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MedicalDeviceMaintenancesApi extends Api<
	MedicalDeviceMaintenanceModel,
	LaravelPaginationResponse<MedicalDeviceMaintenanceModel>,
	MedicalDeviceMaintenanceStorePayload,
	MedicalDeviceMaintenanceUpdatePayload
> {
	route = 'medical-device-maintenances'
}
