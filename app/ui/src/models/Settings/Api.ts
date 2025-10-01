import type {
	SettingsModel,
	SettingsStorePayload,
	SettingsUpdatePayload,
} from '@/models/Settings/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SettingssApi extends Api<
	SettingsModel,
	LaravelPaginationResponse<SettingsModel>,
	SettingsStorePayload,
	SettingsUpdatePayload
> {
	route = 'settings'
}
