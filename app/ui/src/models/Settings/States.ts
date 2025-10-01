import type { SettingsModel } from '@/models/Settings/Model'
import SettingssApi from '@/models/Settings/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SettingsDetailsState extends DetailsState<SettingssApi, SettingsModel> {
	api = new SettingssApi()
}

export function useSettingsDetailsState() {
	return new SettingsDetailsState()
}

export class SettingsListState extends ListState<
	SettingssApi,
	SettingsModel,
	LaravelPaginationResponse<SettingsModel>
> {
	api = new SettingssApi()
}

export function useSettingsListState() {
	return new SettingsListState()
}
