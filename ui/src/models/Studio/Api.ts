import type { StudioModel, StudioStorePayload, StudioUpdatePayload } from '@/models/Studio/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class StudiosApi extends Api<
	StudioModel,
	LaravelPaginationResponse<StudioModel>,
	StudioStorePayload,
	StudioUpdatePayload
> {
	route = 'studios'
}
