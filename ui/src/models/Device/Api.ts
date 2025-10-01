import type { DeviceModel, DeviceStorePayload, DeviceUpdatePayload } from '@/models/Device/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DevicesApi extends Api<
	DeviceModel,
	LaravelPaginationResponse<DeviceModel>,
	DeviceStorePayload,
	DeviceUpdatePayload
> {
	route = 'devices'
}
