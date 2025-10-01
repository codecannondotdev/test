import type { DeviceModel } from '@/models/Device/Model'
import DevicesApi from '@/models/Device/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DeviceDetailsState extends DetailsState<DevicesApi, DeviceModel> {
	api = new DevicesApi()
}

export function useDeviceDetailsState() {
	return new DeviceDetailsState()
}

export class DeviceListState extends ListState<
	DevicesApi,
	DeviceModel,
	LaravelPaginationResponse<DeviceModel>
> {
	api = new DevicesApi()
}

export function useDeviceListState() {
	return new DeviceListState()
}
